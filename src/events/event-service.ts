import mongoose from 'mongoose';
import { CreateEventDto } from './dtos/CreateEvent.dot';
import EventModel, { IEvent } from './models/Event';

interface PaginationOptions {
  page: number;
  limit: number;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
}

class EventService {
  async getEventById(id: string): Promise<IEvent | null> {
    return await EventModel.findById(id).exec();
  }

  async getEvents(city?: string, options?: PaginationOptions): Promise<IEvent[]> {
    const filter = city ? { location: city } : {};
    const sort: { [key: string]: 1 | -1 } = { [options?.sortBy || 'rating']: options?.sortDirection === 'desc' ? -1 : 1 };
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const skip = (page - 1) * limit;

    return await EventModel.find(filter).sort(sort).skip(skip).limit(limit).exec();
  }

  async createEvent(createEventDto: CreateEventDto): Promise<IEvent> {
    const { name, description, date, location, duration } = createEventDto;
    const newEvent = new EventModel({
      name,
      description,
      date: new Date(date),
      location,
      duration,
    });

    await newEvent.save();
    return newEvent;
  }
}

export default EventService;
