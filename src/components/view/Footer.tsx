import { VerticalAlignBottom } from '@mui/icons-material';
import { MDBFooter, MDBContainer } from 'mdb-react-ui-kit';

export function ViewFooter() {
  return (
    <MDBFooter style={{ backgroundColor: '#92a8d1' }}>
      <div style={{padding:14}}>
        © 2024 Copyright:
        <a href='http://www.instagram.com/timufumi'>
          Fumiya.O
        </a>
      </div>
    </MDBFooter>
  );
}
//viwheightの一番下配置
export default ViewFooter;