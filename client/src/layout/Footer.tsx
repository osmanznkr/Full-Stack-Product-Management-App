import Typography from '@material-ui/core/Typography';

const Footer = () => {
  return (
    <div style={{ backgroundColor: '#f5f5f5', padding: '20px', position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <Typography variant="body1" align="center">
        © 2024 Product Management App By osmanzkr
      </Typography>
    </div>
  );
}

export default Footer;