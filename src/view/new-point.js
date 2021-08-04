/* eslint-disable camelcase*/
import {renderList} from '../utils/util.js';
import {createProtoPoint} from './proto-point.js';

const crateEventPhoto = (src) => `<img class="event__photo" src="${src}" alt="Event photo"></img>`;

export const createNewPoint = (data) => `
  ${createProtoPoint(data)};
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${renderList(data.destination__photos || [], crateEventPhoto)}
            </div>
          </div>
        </section>
      </section>
    </form>
  </li>`;
