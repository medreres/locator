import { Router } from "express";
import { getLocation } from "../view/location";

const locationRouter = Router();

locationRouter.get('/location', getLocation);

export default locationRouter;