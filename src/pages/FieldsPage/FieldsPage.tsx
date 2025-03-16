import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import styles from "./FieldsPage.module.scss";
import { Breadcrumb, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { CityEntity, FieldEntity, SportEntity } from "../../entities/Entities";
import FieldCardComponent from "./FieldCardComponent/FieldCardComponent";
import { FormattedMessage, useIntl } from "react-intl";

interface FieldsPageProps {}

const FieldsPage: FC<FieldsPageProps> = () => {
  const { formatMessage } = useIntl();
  const mockCity: CityEntity = {
    id: "1",
    name: "Mock City",
  };

  const mockSports: SportEntity[] = [
    {
      id: "1",
      name: "Soccer",
      availableFields: 2,
      availableBookings: 5,
    },
    {
      id: "2",
      name: "Basketball",
      availableFields: 2,
      availableBookings: 2,
    },
  ];

  const mockFieldEntity: FieldEntity = {
    id: "1",
    name: "Mock Field",
    city: mockCity,
    address: "123 Mock Street",
    sports: mockSports,
    createdById: "user123",
  };
  // Fetch data
  let fieldsData: Array<FieldEntity> = Array(10).fill(mockFieldEntity);
  fieldsData = fieldsData.map((item, index) => {
    return { ...item, name: item.name + " " + index.toString() };
  });
  // Hooks
  const navigate = useNavigate();
  const [filteredFieldsData, setFilteredFieldsData] = useState<FieldEntity[]>(
    fieldsData.slice()
  );
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentSearchValue, setCurrentSearchValue] = useState<string>("");

  const filterData = () => {
    setFilteredFieldsData(
      fieldsData.filter((item) => {
        const name = item.name;
        const address = item.address;
        const normalizedSearchValue = searchValue.toLowerCase();
        const concatenatedField = `${name} ${address}`.toLowerCase();
        return concatenatedField.includes(normalizedSearchValue);
      })
    );
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
  };
  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentSearchValue(searchValue);
    console.log("Search Updated: ", currentSearchValue);
    filterData();
    console.log(filteredFieldsData);
  };
  return (
    <div className="main_content_container pt-2">
      <Container fluid={"md"}>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
            <FormattedMessage id="pages.home" />
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            <FormattedMessage id="pages.fields" />
          </Breadcrumb.Item>
        </Breadcrumb>
        <Row className="mb-3 gy-2">
          <Col>
            <h1 className={`display-5 sh_gold`}>
              <FormattedMessage id="fields.title" />
            </h1>
          </Col>
          <Col md="auto" className={styles.create_col}>
            <Button onClick={() => navigate("/fields/create")}>
              <FormattedMessage id="fields.createButton" />
            </Button>
          </Col>
          <Col md="auto" className={styles.search_col}>
            <Form onSubmit={handleSearchSubmit} className={styles.search_form}>
              <Form.Control
                onChange={handleSearchChange}
                type="search"
                placeholder={formatMessage({ id: "form.placeholder.search" })}
                aria-label="Search"
              />
              <Button type="submit" variant="outline-success">
                <FormattedMessage id="form.placeholder.search" />
              </Button>
            </Form>
          </Col>
        </Row>
        <Row lg={3} md={3} sm={2} xs={1} className="gy-3">
          {filteredFieldsData.map((item, index) => (
            <Col key={index}>
              <FieldCardComponent fieldData={item} />
            </Col>
          ))}
        </Row>
        {filteredFieldsData.length === 0 && (
          <p>
            <FormattedMessage
              id="fields.dataNotFound"
              values={{ value: currentSearchValue }}
            />
          </p>
        )}
      </Container>
    </div>
  );
};

export default FieldsPage;
