import { EventDispatcher } from 'event-dispatch';
import './user.event';
import './organizer.event';

const eventDispatcher = new EventDispatcher();

export default eventDispatcher;
