import React, {PureComponent} from 'react';
import uuid from 'uuid';
import {findIndex} from 'lodash';

import api from '../../../../api';

import {MODAL_CREATE_RECORD, MODAL_UPDATE_RECORD} from './constants';

import CreateRecord from './CreateRecord';
import TableRecords from './TableRecords';
import UpdateRecord from './UpdateRecord';

class MDI extends PureComponent {
  state = {
    api: {
      err: false,
      fetching: false,
    },
    modal: {
      name: '',
      params: {},
    },
    records: [],
  };

  render() {
    const {action, state} = this;

    return (
      <div>
        {state.modal.name === MODAL_CREATE_RECORD && <CreateRecord state={state} action={action} />}
        {state.modal.name === MODAL_UPDATE_RECORD && <UpdateRecord state={state} action={action} />}
        <TableRecords state={state} action={action} />
      </div>
    );
  }

  action = {
    fetchRecords: () => {
      this.setState(state => ({
        api: {
          ...state.api,
          err: false,
          fetching: true,
        },
      }));

      api.mdi
        .fetch()
        .then(res => {
          const {records} = res.body;

          this.setState(state => ({
            api: {
              ...state.api,
              err: false,
              fetching: false,
            },
            records,
          }));
        })
        .catch(() => {
          this.setState(state => ({
            api: {
              ...state.api,
              err: true,
              fetching: false,
            },
            records: [],
          }));
        });
    },
    moveRecord: (from, to) => {
      const records = [...this.state.records];
      records.splice(to < 0 ? records.length + to : to, 0, records.splice(from, 1)[0]);

      this.setState({
        records,
      });
    },
    createRecord: options => {
      this.setState(
        state => ({
          records: state.records.concat({
            id: uuid.v4(),
            ...options,
          }),
        }),
        () => {
          this.action.closeModal();
        }
      );
    },
    updateRecord: (id, options) => {
      const records = [...this.state.records];
      const index = findIndex(records, {id});

      if (index < 0) {
        return;
      }

      records[index] = {
        ...records[index],
        ...options,
      };

      this.setState(
        {
          records,
        },
        () => {
          this.action.closeModal();
        }
      );
    },
    removeRecord: id => {
      this.setState(state => ({
        records: state.records.filter(record => record.id !== id),
      }));
    },
    openModal: (name = '', params = {}) => {
      this.setState({
        modal: {
          name,
          params,
        },
      });
    },
    closeModal: () => {
      this.setState({
        modal: {
          name: '',
          params: {},
        },
      });
    },
    updateModalParams: (params = {}) => {
      this.setState(state => ({
        modal: {
          ...state.modal,
          params: {
            ...state.modal.params,
            ...params,
          },
        },
      }));
    },
  };

  componentDidMount() {
    this.action.fetchRecords();
  }
}

export default MDI;
