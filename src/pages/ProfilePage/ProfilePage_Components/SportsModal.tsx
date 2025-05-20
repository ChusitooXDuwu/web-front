import { useMutation, useQuery } from "@tanstack/react-query";
import { FunctionComponent, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";
import {
  requestAddFriend,
  requestAddSport,
  requestAllUsers,
} from "../../../services/UserService/UserService";
import { useProfile } from "../../../contexts/ProfileContext";
import { Link } from "react-router-dom";
import getSports from "../../../services/SportsService/SportsService";

interface SportsModalProps {
  show: boolean;
  handleClose: () => void;
}

const SportsModal: FunctionComponent<SportsModalProps> = ({
  show,
  handleClose,
}) => {
  const { profile, refetch: refetchProfile } = useProfile();
  const favoriteSports = profile ? profile.favoriteSports : [];
  const favoriteSportIds = new Set(favoriteSports.map((item) => item.id));
  const outlineHeart = "bi-heart";
  const fillHeart = "bi-heart-fill";
  const { data, isSuccess } = useQuery({
    queryKey: ["sports"],
    queryFn: () => getSports(),
    enabled: true,
  });

  const addSportMutation = useMutation({
    mutationFn: (params: { userId: string; sportId: string }) =>
      requestAddSport(params.userId, params.sportId),
    onSuccess: () => {
      refetchProfile();
    },
    onError: () => {},
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <FormattedMessage id="sports.modal.title" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row xs={1} md={2}>
          {isSuccess &&
            data.data.map((item) => (
              <Col key={item.id}>
                <div
                  className="d-flex my-2"
                  style={{
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <p>{item.name} </p>
                  <Button
                    size="sm"
                    onClick={(e) =>
                      addSportMutation.mutate({
                        userId: profile!.id,
                        sportId: item.id,
                      })
                    }
                  >
                    <i
                      className={[
                        "bi",
                        favoriteSportIds.has(item.id)
                          ? fillHeart
                          : outlineHeart,
                      ].join(" ")}
                    ></i>
                  </Button>
                </div>
              </Col>
            ))}
        </Row>
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
