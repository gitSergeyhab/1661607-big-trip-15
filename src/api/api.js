import PointsModel from '../model/points-model';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const EndPoints = {
  POINTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
  SYNC: 'points/sync',
};

export default class Api {
  constructor(url, authorization) {
    this._basicUrl = url;
    this._authorization = authorization;
  }

  getPoints() {
    return this._load({url: EndPoints.POINTS})
      .then((response) => response.json())
      .then((points) => points.map(PointsModel.adaptToClient)) . then(y=> {console.log(y); return y});
  }

  getOffers() {
    return this._load({url: EndPoints.OFFERS})
      .then((response) => response.json()) . then(y=> {console.log(y); return y});
  }

  getDestinations() {
    return this._load({url: EndPoints.DESTINATIONS})
      .then((response) => response.json());
  }

  updatePoint(point) {
    return this._load({
      url: `${EndPoints.POINTS}/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(PointsModel.adaptToServer(point)) ,
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then((response) => response.json())
      .then(PointsModel.adaptToClient);
  }

  addPoint(point) {
    return this._load({
      url: EndPoints.POINTS,
      method: Method.POST,
      body: JSON.stringify(PointsModel.adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then((response) => response.json())
      .then(PointsModel.adaptToClient);
  }


  deletePoint(point) {
    return this._load({
      url: `${EndPoints.POINTS}/${point.id}`,
      method: Method.DELETE,
    });
  }

  sync(point) {
    return this._load({
      url: EndPoints.SYNC,
      method: Method.POST,
      body: JSON.stringify(point),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then((response) => response.json());
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append('Authorization', this._authorization);
    return fetch(`${this._basicUrl}/${url}`, {method, body, headers})
      .then(Api.checkStatus)
      .catch((err) => {throw err;});
  }


  static checkStatus(response) {
    if (response.ok) {
      return response;
    }

    throw new Error(response.statusText);
  }
}
