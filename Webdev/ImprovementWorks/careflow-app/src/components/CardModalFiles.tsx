import { useState, ChangeEvent, FormEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { PlusLg, Paperclip, Download } from "react-bootstrap-icons";
import { db, fileStorage } from "../firebase";
import { doc, getDoc, collection, Timestamp, addDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Link } from "react-router-dom";

const saveFileButtonStyle = {
  backgroundColor: "#051F6F",
  fontSize: "16px",
  padding: "10px 20px",
  border: "none",
  cursor: "pointer",
  marginTop: "20px",
  width: "100%",
};

const flexAndCenter = {
  display: "flex",
  alignItems: "center",
};

const formGroupStyle = {
  backgroundColor: "#F4F4F4",
  padding: "20px",
  marginBottom: "20px",
  borderRadius: "10px",
};

const whiteContainerStyle = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #E8E7E7",
  paddingTop: "10px",
  paddingBottom: "10px",
  paddingLeft: "15px",
  borderRadius: "10px",
};

interface cardModalFilesProps {
  files: {
    file_descriptions: string[];
    file_names: string[];
    file_urls: string[];
  };
  setUpdatedFiles: React.Dispatch<
    React.SetStateAction<{
      file_descriptions: string[];
      file_names: string[];
      file_urls: string[];
    }>
  >;
}

//The section of the modal where the user uploads files
function CardModalFiles({ files, setUpdatedFiles }: cardModalFilesProps) {
  const [showFileModal, setShowFileModal] = useState(false);
  const [newFile, setNewFile] = useState<File | null>(null);
  const [newFileDescription, setNewFileDescription] = useState("");
  const [newFileUrl, setNewFileUrl] = useState("");
  const [progresspercent, setProgresspercent] = useState(0);

  const handleShowFileModal = () => {
    setShowFileModal(true);
  };
  const handleCloseFileModal = () => {
    setShowFileModal(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setNewFile(selectedFile);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewFileDescription(event.target.value);
  };

  // const handleUrlChange = () => {
  //   setNewFileUrl(newFileUrl);
  // }

  const handleUploadFile = () => {
    if (newFile) {
      const updatedFileNames = [...files.file_names, newFile.name];
      const updatedFileDescriptions = [
        ...files.file_descriptions,
        newFileDescription,
      ];

      //Uploading file to cloud storage

      const storageRef = ref(fileStorage, `files/${newFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, newFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgresspercent(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setNewFileUrl(downloadURL);
            console.log("File-url: " + newFileUrl);
            const updatedFileUrls = [...files.file_urls, downloadURL];
            setUpdatedFiles({
              file_names: updatedFileNames,
              file_descriptions: updatedFileDescriptions,
              file_urls: updatedFileUrls,
            });
            console.log(updatedFileNames);
            console.log(updatedFileDescriptions);
            console.log(updatedFileUrls);
          });
        }
      );

      // Clear new file and description field
      setNewFile(null);
      setNewFileDescription("");
      //setNewFileUrl("");
      handleCloseFileModal();
    }
  };

  return (
    <>
      <Form.Group style={formGroupStyle}>
        <Form.Label>
          <b>Bilagor</b>
          <p style={{ fontSize: "75%", fontStyle: "italic" }}>
            Här lägger du bilagor som kan vara relevanta för fasen - t.ex
            handlingsplan, diagram, eller loggbok.{" "}
          </p>
        </Form.Label>
        <div style={whiteContainerStyle}>
          {files.file_names.map((item, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              <Paperclip
                style={{
                  marginRight: "9px",
                  fontWeight: "bold",
                  width: "17px",
                  height: "17px",
                }}
              />
              {/* Print the file name followed by the decription (if there is no description, only print the file name) */}
              {files.file_descriptions[index] === "" ? (
                <span>
                  <Link to={files.file_urls[index]}>{item}</Link>
                </span>
              ) : (
                <span>
                  <Link to={files.file_urls[index]}>{item}</Link>
                  <span
                    style={{
                      color: "#AEAEAE",
                      fontSize: "14px",
                      marginLeft: "7px",
                    }}
                  >
                    ({files.file_descriptions[index]})
                  </span>
                </span>
              )}
            </div>
          ))}

          <Button
            style={{
              backgroundColor: "#FFFFFF",
              color: "#000000",
              fontSize: "15.5px",
              padding: "0px",
              border: "none",
              cursor: "pointer",
              marginTop: files.file_names.length === 0 ? "0px" : "17px",
            }}
            onClick={handleShowFileModal}
          >
            <div style={flexAndCenter}>
              <PlusLg style={{ marginRight: "9px" }} />
              <div>Ladda upp bilaga</div>
            </div>
          </Button>
        </div>
      </Form.Group>

      <Modal
        show={showFileModal}
        onHide={handleCloseFileModal}
        style={{ top: "25%", fontFamily: "Avenir" }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="d-flex justify-content-center align-items-center">
          <Form style={{ width: "90%" }}>
            <div className="mb-3 text-center">
              <input
                type="file"
                className="form-control"
                id="fileInput"
                name="file"
                onChange={handleFileChange}
              />
            </div>
            <div className="mb-3 text-center">
              <input
                type="text"
                className="form-control"
                placeholder="Lägg till en beskrivande mening..."
                style={{ fontStyle: "italic" }}
                value={newFileDescription}
                onChange={handleDescriptionChange}
              ></input>
            </div>
            <div className="mb-3 text-center">
              <Button style={saveFileButtonStyle} onClick={handleUploadFile}>
                Ladda upp bilaga
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CardModalFiles;
