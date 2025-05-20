import { Link, useParams } from "react-router-dom";
import { Container, Col, Row, Breadcrumb } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { FunctionComponent } from "react";
import UserInfo from "./components/UserInfo";
import { useQuery } from "@tanstack/react-query";
import { requestUser } from "../../services/UserService/UserService";

interface UserComponentProps {}

const UserComponent: FunctionComponent<UserComponentProps> = () => {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["user", id],
    queryFn: () => requestUser(id || ""),
    enabled: !!id,
  });
  return (
    <div className="main_content_container pt-2">
      <Container
        fluid="md"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
        }}
      >
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
            <FormattedMessage id="pages.home" />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <FormattedMessage id="pages.users" />
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            {data?.data.givenName} {data?.data.lastName}
          </Breadcrumb.Item>
        </Breadcrumb>
        <Row style={{ flex: 1, justifyContent: "center" }}>
          <Col className="px-4">
            <UserInfo user={data?.data || null} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserComponent;
