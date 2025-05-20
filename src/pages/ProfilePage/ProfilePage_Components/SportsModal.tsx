import { useMutation, useQuery } from "@tanstack/react-query";
import { FunctionComponent, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";
import {
  requestAddFriend,
  requestAllUsers,
} from "../../../services/UserService/UserService";
import { useProfile } from "../../../contexts/ProfileContext";
import { Link } from "react-router-dom";

interface SportsModalProps {
  show: boolean;
  handleClose: () => void;
}

const SportsModal: FunctionComponent<SportsModalProps> = ({
  show,
  handleClose,
}) => {
  const intl = useIntl();
  const namePlaceholder = intl.formatMessage({
    id: "friends.modal.search-placeholders",
  });
  const { profile, refetch: refetchProfile } = useProfile();

  const [searchTerm, setSearchTerm] = useState("");

  const {
    data,
    isSuccess,
    isLoading,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["searchUsers", searchTerm],
    queryFn: () => requestAllUsers({ name: searchTerm }),
    enabled: false,
  });

  const addFriendMutation = useMutation({
    mutationFn: (params: { userId: string; friendId: string }) =>
      requestAddFriend(params.userId, params.friendId),
    onSuccess: () => {
      refetchProfile();
    },
    onError: () => {},
  });
  const triggerSearch = () => {
    refetchUsers();
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
          data.data.map(
            (item) =>
              profile?.id !== item.id &&
              profile?.friends?.find((friend) => friend.id === item.id) ===
                undefined && (
                <div key={item.id} className="d-flex gap-4 my-2">
                  <p>
                    {item.givenName} {item.lastName}
                  </p>
                  <Link to={`/users/${item.id}`} style={{ marginLeft: "auto" }}>
                    <Button
                      aria-label="see user detail"
                      title="see user detail"
                    >
                      <i className="bi bi-person"></i>
                    </Button>
                  </Link>
                  <Button
                    title="add friend"
                    aria-label="add friend"
                    onClick={(e) =>
                      addFriendMutation.mutate({
                        userId: profile!.id,
                        friendId: item.id,
                      })
                    }
                  >
                    <i className="bi bi-plus"></i>
                  </Button>
                </div>
              )
          )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SportsModal;
