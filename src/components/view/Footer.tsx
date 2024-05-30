import { MDBFooter, MDBContainer } from 'mdb-react-ui-kit';

export function ViewFooter() {
  return (
    <MDBFooter style={{ backgroundColor: '#92a8d1', height: 61 }}>
      <MDBContainer></MDBContainer>
      <div style={{ backgroundColor: '#92a8d1',textAlign: "center"}}>
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