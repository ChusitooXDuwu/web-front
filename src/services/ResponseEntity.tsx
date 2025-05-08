/**
 * @deprecated Use the response entity instead
 */
interface OldResponseEntity<T> {
  message: string;
  data: { [entityName: string]: T };
}

interface ResponseEntity<T> {
  message: string;
  data: T;
}

export { ResponseEntity };

export default OldResponseEntity;
