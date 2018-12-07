import getters from './coreCoach/getters';
import * as actions from './coreCoach/actions';
import examCreation from './examCreation';
import examReport from './examReport';
import examReportDetail from './examReportDetail';
import examsRoot from './examsRoot';
import exerciseDetail from './exerciseDetail';
import groups from './groups';
import lessonResourceUserSummary from './lessonResourceUserSummary';
import lessonSummary from './lessonSummary';
import lessonsRoot from './lessonsRoot';
import reports from './reports';

export default {
  state: {
    busy: false,
    classCoaches: [],
    classId: null,
    classList: [],
    className: null,
    currentClassroom: {},
    pageName: '',
    toolbarRoute: {},
    toolbarTitle: '',
    reportRefreshInterval: 30000,
  },
  mutations: {
    SET_PAGE_NAME(state, pageName) {
      state.pageName = pageName;
    },
    SET_CLASS_INFO(state, { classId, classList, currentClassroom }) {
      state.currentClassroom = currentClassroom;
      state.classId = classId;
      state.className = currentClassroom ? currentClassroom.name : '';
      state.classCoaches = currentClassroom ? currentClassroom.coaches : [];
      state.classList = classList;
    },
    SET_TOOLBAR_TITLE(state, title) {
      state.toolbarTitle = title;
    },
    SET_TOOLBAR_ROUTE(state, toolbarRoute) {
      state.toolbarRoute = toolbarRoute;
    },
  },
  actions,
  getters,
  modules: {
    examCreation,
    examReport,
    examReportDetail,
    examsRoot,
    exerciseDetail,
    groups,
    lessonResourceUserSummary,
    lessonSummary,
    lessonsRoot,
    reports,
  },
};
