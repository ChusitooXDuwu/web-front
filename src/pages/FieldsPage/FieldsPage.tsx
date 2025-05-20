import { ChangeEvent, FC, FormEvent, useEffect, useState, useCallback } from "react";
import styles from "./FieldsPage.module.scss";
import { Breadcrumb, Button, Col, Container, Form, Row, Spinner, Alert } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FieldEntity } from "../../entities/Entities";
import FieldCardComponent from "./FieldCardComponent/FieldCardComponent";
import { FormattedMessage, useIntl } from "react-intl";
import { useQuery } from "@tanstack/react-query";
import getFields from "../../services/FieldsServices/FieldsService";
import { useProfile } from "../../contexts/ProfileContext";

interface FieldsPageProps { }

const FieldsPage: FC<FieldsPageProps> = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialSportFilter = searchParams.get("sport") || "";
  const { profile } = useProfile();

  // Check if user is authenticated
  const isAuthenticated = !!profile?.id;

  // Use react-query to fetch fields data
  const {
    isLoading,
    isError,
    isSuccess,
    data: fieldsData
  } = useQuery({
    queryKey: ["fields"],
    queryFn: getFields,
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    retry: 1,
    enabled: true
  });

  // Local state for filtering
  const [filteredFieldsData, setFilteredFieldsData] = useState<FieldEntity[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentSearchValue, setCurrentSearchValue] = useState<string>("");
  const [selectedSport, setSelectedSport] = useState<string>(initialSportFilter);
  const [sportsOptions, setSportsOptions] = useState<string[]>([]);
  useEffect(() => {
    if (searchParams.get("sport")) {
      setSelectedSport(searchParams.get("sport") || "");
    }
  }, [searchParams]);

  useEffect(() => {
    if (isSuccess && fieldsData) {
      const allSports = fieldsData.data.flatMap(field => field.sports?.map(sport => sport.name) ?? []);
      const uniqueSports = Array.from(new Set(allSports));
      setSportsOptions(uniqueSports);
    }
  }, [fieldsData, isSuccess]);
  // Define filterData as a useCallback to fix the dependency warning
  const filterData = useCallback(() => {
    if (!isSuccess || !fieldsData || !fieldsData.data) {
      console.log("Cannot filter: No data available");
      return;
    }

    setFilteredFieldsData(
      fieldsData.data.filter((item) => {
        // Get field name from either format
        const name = item.name || item.fieldName || "";
        // Get city name from either format
        const cityName = item.city?.name || item.cityName || "";
        const address = item.address || "";
        const normalizedSearchValue = currentSearchValue.toLowerCase();
        const concatenatedField = `${name} ${cityName} ${address}`.toLowerCase();

        const matchesSearch = concatenatedField.includes(normalizedSearchValue);
        const matchesSport = selectedSport
          ? item.sports?.some(
            (sport) =>
              sport.name.toLowerCase() === selectedSport.toLowerCase()
          )
          : true;

        return matchesSearch && matchesSport;
      })
    );
  }, [isSuccess, fieldsData, currentSearchValue, selectedSport]);

  // Update filtered data when API data changes or filters change
  useEffect(() => {
    if (isSuccess && fieldsData && fieldsData.data) {
      console.log("Filtering fields data:", fieldsData.data.length, "fields");
      filterData();
    } else {
      console.log("No field data available for filtering");
    }
  }, [isSuccess, fieldsData, selectedSport, currentSearchValue, filterData]);

  // Event handlers
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentSearchValue(searchValue);
  };

  const handleSportChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSport = e.target.value;
    setSelectedSport(newSport);
    navigate(`/fields?sport=${newSport}`);
  };

  // If user is not authenticated, show a message
  if (!isAuthenticated) {
    return (
      <div className="main_content_container pt-2">
        <Container fluid={"md"}>
          <Alert variant="warning">
            <Alert.Heading>Authentication Required</Alert.Heading>
            <p>You need to be logged in to view fields. Please log in and try again.</p>
            <Button onClick={() => navigate("/login")}>Go to Login</Button>
          </Alert>
        </Container>
      </div>
    );
  }

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
              <option value="">
                <FormattedMessage id="field.todos" />
              </option>
              {sportsOptions.map((sportName) => (
                <option key={sportName} value={sportName.toLowerCase()}>
                  {sportName}
                </option>
              ))}
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

        {/* Loading state */}
        {isLoading && (
          <div className="text-center my-5">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-3">Loading fields...</p>
          </div>
        )}

        {/* Error state */}
        {isError && (
          <Alert variant="info" className="my-3">
            <Alert.Heading>Using Mock Data</Alert.Heading>
            <p>
              We couldn't connect to the fields API at this time. Using sample data instead.
            </p>
          </Alert>
        )}

        {/* Success state - show fields */}
        {(isSuccess || isError) && fieldsData && (
          <>
            <Row lg={3} md={3} sm={2} xs={1} className="gy-3">
              {(filteredFieldsData.length > 0 ? filteredFieldsData : []).map((item, index) => (
                <Col key={index}>
                  <FieldCardComponent fieldData={item} />
                </Col>
              ))}
            </Row>

            {/* No results message */}
            {filteredFieldsData.length === 0 && (
              <Alert variant="info" className="my-3">
                <p>
                  <FormattedMessage
                    id="fields.dataNotFound"
                    values={{ value: currentSearchValue || "all fields" }}
                  />
                </p>
              </Alert>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default FieldsPage;