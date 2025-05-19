import { useQuery } from "@tanstack/react-query";
import { FunctionComponent, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";
import { requestAllUsers } from "../../../services/UserService/UserService";

interface FriendsModalProps {
  show: boolean;
  handleClose: () => void;
}

const FriendsModal: FunctionComponent<FriendsModalProps> = ({
  show,
  handleClose,
}) => {
  const intl = useIntl();
  const namePlaceholder = intl.formatMessage({
    id: "friends.modal.search-placeholders",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const { data, isSuccess, isLoading, error, refetch } = useQuery({
    queryKey: ["searchUsers", searchTerm],
    queryFn: () => requestAllUsers({ name: searchTerm }),
    enabled: false,
  });
  const triggerSearch = () => {
    refetch();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <FormattedMessage id="friends.modal.title" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>
            <FormattedMessage id="friends.modal.search-label" />
          </Form.Label>
          <div className="d-flex gap-3">
            <Form.Control
              type="text"
              placeholder={namePlaceholder}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && triggerSearch()}
            />
            <Button onClick={triggerSearch} disabled={isLoading}>
              <i className="bi bi-search"></i>
            </Button>
          </div>
        </Form.Group>
        {isSuccess &&
          data.data.map((item) => (
            <p>
              {item.givenName} {item.lastName}
            </p>
          ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FriendsModal;
