import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import styles from "./FieldsPage.module.scss";
import { Breadcrumb, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FieldEntity } from "../../entities/Entities";
import FieldCardComponent from "./FieldCardComponent/FieldCardComponent";
import { FormattedMessage, useIntl } from "react-intl";
import { useQuery } from "@tanstack/react-query";
import getFields from "../../services/FieldsService/FieldsService";

interface FieldsPageProps {}

const FieldsPage: FC<FieldsPageProps> = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  // Fetch data
  const { isSuccess, data: fieldsData } = useQuery({
    queryKey: ["fields"],
    queryFn: getFields,
  });

  // Hooks
  const [filteredFieldsData, setFilteredFieldsData] = useState<FieldEntity[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentSearchValue, setCurrentSearchValue] = useState<string>("");
  const [selectedSport, setSelectedSport] = useState<string>("");

  useEffect(() => {
    if (isSuccess) {
      const { data } = fieldsData;
      console.log(`fields ${data}`)
      setFilteredFieldsData(data);
    }
  }, [fieldsData, isSuccess]);

  const filterData = () => {
    if (!isSuccess) return;

    setFilteredFieldsData(
      fieldsData.data.filter((item) => {
        const name = item.name;
        const address = item.address;
        const normalizedSearchValue = searchValue.toLowerCase();
        const concatenatedField = `${name} ${address}`.toLowerCase();

        const matchesSearch = concatenatedField.includes(normalizedSearchValue);
        const matchesSport = selectedSport
          ? item.sports.some((sport) => sport.name.toLowerCase() === selectedSport.toLowerCase())
          : true;

        return matchesSearch && matchesSport;
      })
    );
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentSearchValue(searchValue);
    filterData();
  };

  const handleSportChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSport(e.target.value);
    filterData();
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
            <Form.Select onChange={handleSportChange} value={selectedSport}>
              <option value=""><FormattedMessage id="field.todos"/></option>
              <option value="soccer"><FormattedMessage id="field.soccer"/></option>
              <option value="basketball"><FormattedMessage id="field.basketball"/></option>
              <option value="tennis"><FormattedMessage id="field.tennis"/></option>
              <option value="volleyball"><FormattedMessage id="field.volley"/></option>
            </Form.Select>
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
