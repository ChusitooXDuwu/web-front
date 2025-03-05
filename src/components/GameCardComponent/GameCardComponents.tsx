import { FunctionComponent } from "react";
import { Card } from "react-bootstrap";
import styles from './GameCardComponent.module.scss';

interface GameCardComponentProps {}

const GameCardComponent: FunctionComponent<GameCardComponentProps> = () => {
  return <>
    <Card className={styles.game_card}>
        <Card.Body>
            Game Card content
        </Card.Body>
    </Card>
  </>;
};

export default GameCardComponent;
