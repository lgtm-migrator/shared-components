import { types, Instance } from "mobx-state-tree";
import { Geometry } from '@turf/helpers';
import { DrawType } from '../../common/components/ol-map/interactions/draw';

export const ConflictMapState = types
  .model({
    drawState: types.maybeNull(types.number),
    currentGeometry: types.maybeNull(types.frozen<Geometry>())
  })
  .actions(self => ({
    startDraw: function (type: DrawType) {
      self.drawState = type;
    },

    setGeometry: function (geom: Geometry) {
      self.currentGeometry = geom;
      self.drawState = null
    },

    resetState: function () {
      self.currentGeometry = null;
      self.drawState = null;
    }
  }))

export interface IConflictMapState extends Instance<typeof ConflictMapState> { }