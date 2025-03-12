interface ResponseEntity<T> {
  message: string;
  data: { [entityName: string]: T };
}

export default ResponseEntity;