
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';




export const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);

export default StyledBadge