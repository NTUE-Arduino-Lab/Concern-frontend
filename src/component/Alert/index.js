
// import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Alert=(props) =>{
    return(
    <Modal {...props}  centered>
        <Modal.Body>
          <h4>{props.text}</h4>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="danger" size="sm" onClick={props.onHide}>
          確認
        </Button>
        </Modal.Footer>
    </Modal>
    );
};
export default Alert;