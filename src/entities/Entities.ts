// Updated src/entities/Entities.ts to export the right types

import BookedEventEntity from "./BookedEventEntity";
import SportEntity from "./SportInterface";
import CityEntity from "./CityEntity";
import FieldEntity, { FieldDetailEntityFormat } from "./FieldEntity";
import EventEntity from "./EventEntity";
import EventInterface from "./EventInterface";
import ProfileEntity from "./ProfileEntity";

export {
  EventEntity,
  EventInterface,
  BookedEventEntity,
  SportEntity,
  CityEntity,
  FieldEntity,
  FieldDetailEntityFormat,
  ProfileEntity,
};