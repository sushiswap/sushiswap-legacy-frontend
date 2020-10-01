import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useBentoBalance from '../../../bento_hooks/useBentoBalance'
import { getBalanceNumber } from '../../../utils/formatBalance'
import Button from '../../Button'
import CardIcon from '../../CardIcon'
import Label from '../../Label'
import Modal, { ModalProps } from '../../Modal'
import ModalActions from '../../ModalActions'
import ModalContent from '../../ModalContent'
import ModalTitle from '../../ModalTitle'
import Spacer from '../../Spacer'
import Value from '../../Value'
import { useI18n } from 'use-i18n'

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const t = useI18n()
  const { account, reset } = useWallet()

  const handleSignOutClick = useCallback(() => {
    onDismiss!()
    reset()
  }, [onDismiss, reset])


  const bentoBalance = useBentoBalance()

  return (
    <Modal>
      <ModalTitle text={t.myAccount} />
      <ModalContent>
        <Spacer />

        <div style={{ display: 'flex' }}>
          <StyledBalanceWrapper>
            <CardIcon>
              <span>🍱</span>
            </CardIcon>
            <StyledBalance>
              <Value value={getBalanceNumber(bentoBalance)} />
              <Label text={t.bentoBalance} />
            </StyledBalance>
          </StyledBalanceWrapper>
        </div>

        <Spacer />
        <Button
          href={`https://etherscan.io/address/${account}`}
          text={t.walletEtherScan}
          variant="secondary"
        />
        <Spacer />
        <Button
          onClick={handleSignOutClick}
          text={t.walletSignOut}
          variant="secondary"
        />
      </ModalContent>
      <ModalActions>
        <Button onClick={onDismiss} text={t.walletCancle} />
      </ModalActions>
    </Modal>
  )
}

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`

export default AccountModal
