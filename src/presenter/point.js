import Point from '../view/point.js';
import EditPoint from '../view/edit-point.js';

import {render, replace, remove} from '../utils/dom-utils.js';

const Mode = {
  POINT: 'POINT',
  EDIT: 'EDIT',
};


export default class PointPresenter{
  constructor(pointContainer, changeData) {
    this._pointContainer = pointContainer;
    this._changeData = changeData;

    this._pointComponent = null;
    this._editPointComponent = null;

    this._mode = Mode.POINT;

    this._handlerPoinToEditClick = this._handlerPoinToEditClick.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevEditPointComponent = this._editPointComponent;

    this._pointComponent = new Point(point);
    this._editPointComponent = new EditPoint(point);

    this._pointComponent.setChangeViewHandler(this._handlerPoinToEditClick);
    this._editPointComponent.setChangeViewHandler(this._handlerPoinToEditClick);

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this._pointContainer, this._pointComponent);
      return;
    }

    replace(this._pointComponent, prevPointComponent);
    replace(this._editPointComponent, prevEditPointComponent);

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  }

  _replacePointToEdit() {
    replace(this._pointComponent, this._editPointComponent);
    this._mode = Mode.EDIT;
  }

  _replaceEditToPoint() {
    replace(this._editPointComponent, this._pointComponent);
    this._mode = Mode.POINT;
  }

  _handlerPoinToEditClick() {
    if (this._mode === Mode.EDIT) {
      this._replaceEditToPoint();
      return;
    }
    this._replacePointToEdit();
  }


  // const collapsedPoint = new Point(point);
  // const editPoint = new EditPoint(point);
  // const collapsedPointBtn = collapsedPoint.getElement().querySelector('.event__rollup-btn');
  // const editPointBtn = editPoint.getElement().querySelector('.event__rollup-btn');
  // collapsedPointBtn.addEventListener('click', () => replace(editPoint, collapsedPoint));
  // editPointBtn.addEventListener('click', () => replace(collapsedPoint, editPoint));
  // render(this._pointList, collapsedPoint);
}
