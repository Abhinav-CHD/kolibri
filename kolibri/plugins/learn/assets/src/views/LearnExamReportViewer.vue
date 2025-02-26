<template>

  <KPageContainer :topMargin="0">
    <div v-if="exerciseContentNodes && exerciseContentNodes.length">
      <ExamReport
        :contentId="exam.id"
        :title="exam.title"
        :userName="userName"
        :userId="userId"
        :selectedInteractionIndex="selectedInteractionIndex"
        :questionNumber="questionNumber"
        :tryIndex="tryIndex"
        :exercise="exercise"
        :exerciseContentNodes="exerciseContentNodes"
        :navigateTo="navigateTo"
        :questions="questions"
        @noCompleteTries="noCompleteTries"
      />
    </div>
    <div v-else>
      <p class="no-exercise">
        {{ $tr('missingContent') }}
      </p>
    </div>
  </KPageContainer>

</template>


<script>

  import { mapState } from 'vuex';
  import ExamReport from 'kolibri.coreVue.components.ExamReport';
  import { ClassesPageNames } from '../constants';

  export default {
    name: 'LearnExamReportViewer',
    metaInfo() {
      return {
        title: this.$tr('documentTitle', { examTitle: this.exam.title }),
      };
    },
    components: {
      ExamReport,
    },
    computed: {
      ...mapState('examReportViewer', [
        'exam',
        'exercise',
        'exerciseContentNodes',
        'questionNumber',
        'questions',
        'tryIndex',
      ]),
      ...mapState('examReportViewer', {
        classId: state => state.exam.collection,
        selectedInteractionIndex: state => state.interactionIndex,
      }),
      ...mapState({
        userName: state => state.core.session.full_name,
        userId: state => state.core.session.user_id,
      }),
    },
    methods: {
      navigateTo(tryIndex, questionNumber, interaction) {
        this.$router.push({
          name: ClassesPageNames.EXAM_REPORT_VIEWER,
          params: {
            classId: this.classId,
            questionInteraction: interaction,
            questionNumber,
            tryIndex,
            examId: this.exam.id,
          },
        });
      },
      noCompleteTries() {
        this.$router.replace({
          name: ClassesPageNames.CLASS_ASSIGNMENTS,
          params: { classId: this.classId },
        });
      },
    },
    $trs: {
      documentTitle: {
        message: 'Report for { examTitle }',
        context:
          "Title indicating for a learner's report page that also indicates the name of the quiz.",
      },
      missingContent: {
        message: 'This quiz cannot be displayed because some resources were deleted',
        context:
          'Error message a user sees if there was a problem accessing a quiz report page. This is because the resource has been removed.',
      },
    },
  };

</script>


<style lang="scss" scoped>

  .no-exercise {
    text-align: center;
  }

</style>
