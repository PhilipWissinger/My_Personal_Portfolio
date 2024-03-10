import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteProject } from "../ImprovementWorkLib";
import { AlignCenter } from "react-bootstrap-icons";

interface CardDeleteModalProps {
  show: boolean;
  onHide: () => void;
  impWorkId: string;
fetchProjects: () => void;
impWorkName:String;

}

function CardDeleteModal({ show, onHide, impWorkId,fetchProjects,impWorkName }: CardDeleteModalProps) {
  const handleDeleteClick = async () => {
    await deleteProject(impWorkId);
    onHide(); // Close the modal after deleting
    console.log("pressed delete in modal");
    fetchProjects();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton >
        <Modal.Title className="ms-auto"><b>Radera {impWorkName}</b></Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Är du säker att du vill radera förbättringsarbetet? 
      </Modal.Body>
      <Modal.Footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        <Button variant="danger" onClick={handleDeleteClick}>
          Radera
        </Button>
        <Button variant="primary" onClick={onHide} style={{backgroundColor: "#051F6F",border: "none",}}>
          Avbryt
        </Button>
        
      </Modal.Footer>
    </Modal>
  );
}

export default CardDeleteModal;
