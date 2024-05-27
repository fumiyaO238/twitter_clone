import { MDBFooter, MDBContainer } from 'mdb-react-ui-kit';

export function ViewFooter() {
  return (
    <MDBFooter style={{ backgroundColor: '#92a8d1', height: 58 }}>
      <MDBContainer></MDBContainer>

      <div style={{ backgroundColor: '#92a8d1',textAlign: "center"}}>
        © 2024 Copyright:
        <a href='https://mdbootstrap.com/'>
          F_Otsuka.com
        </a>
      </div>
    </MDBFooter>
  );
}
 
export default ViewFooter