import { Router } from "express";
import { getLocation } from "../controller/location";

const locationRouter = Router();

locationRouter.get('/location', getLocation);

export default locationRouter;