import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import Button from '../../../components/Button'
import Modal, { ModalProps } from '../../../components/Modal'
import ModalActions from '../../../components/ModalActions'
import ModalTitle from '../../../components/ModalTitle'
import TokenInput from '../../../components/TokenInput'
import { getFullDisplayBalance } from '../../../utils/formatBalance'
import { useI18n  } from 'use-i18n';
import { Contract } from 'web3-eth-contract';

interface DepositModalProps extends ModalProps {
  max: BigNumber
  onConfirm: (amount: string) => Promise<any>
  onApprove: (amount: string) => Promise<any>
  tokenName?: string
}

const DepositModal: React.FC<DepositModalProps> = ({
  max,
  onConfirm,
  onApprove,
  onDismiss,
  tokenName = '',
}) => {
  const t = useI18n();

  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const [approved, setApproved] = useState(false)

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <Modal>
      <ModalTitle text={`${t.deposit} ${tokenName}`} />
      <TokenInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
      />
      <ModalActions>
        <Button 
          text={t.cancel} 
          variant="secondary" 
          onClick={async () => {
            onDismiss()
           }} 
        />

        {!approved 
          ? 
          <Button 
            disabled={pendingTx}
            text={t.approval} 
            variant="secondary" 
            onClick={() => {
              setPendingTx(true)
              onApprove(val).then((result) => {
                if (result === true) {
                  setApproved(true)
                } 

                setPendingTx(false)
              })
          }} 
        />
        :
        <Button
          disabled={pendingTx}
          text={pendingTx ? t.pending_confirmation : t.deposit}
          onClick={async () => {
            setPendingTx(true)
            onConfirm(val).then((result) => {
              if (result && result.transactionHash && result.transactionHash.length > 0) {
                console.log('deposit successfully txHash: ', result.transactionHash)
                setPendingTx(false)
                onDismiss()
              }
              setPendingTx(false)
            })
          }}
        />
        }
      </ModalActions>
    </Modal>
  )
}

export default DepositModal
