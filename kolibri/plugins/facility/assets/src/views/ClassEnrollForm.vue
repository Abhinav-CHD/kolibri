<template>

  <form>

    <PaginatedListContainerWithBackend
      v-if="isBackendPaginated"
      :items="usersNotInClass"
      :filterPlaceholder="$tr('searchForUser')"
      :excludeMemberOf="excludeMemberOf"
      :totalPageNumber="totalPages"
      :userAssignmentType="userAssignmentType"
      :totalUsers="totalUsersCount"
    >
      <template #default="{ items, filterInput }">
        <UserTable
          v-model="selectedUsers"
          :users="items"
          :selectable="true"
          :disabled="disabled"
          :emptyMessage="emptyMessageForItems(items, filterInput)"
        />
      </template>
    </PaginatedListContainerWithBackend>
    <PaginatedListContainer
      v-else
      :items="usersNotInClass"
      :filterPlaceholder="$tr('searchForUser')"
    >
      <template #default="{ items, filterInput }">
        <UserTable
          v-model="selectedUsers"
          :users="items"
          :selectable="true"
          :disabled="disabled"
          :emptyMessage="emptyMessageForItems(items, filterInput)"
        />
      </template>
    </PaginatedListContainer>
    <SelectionBottomBar
      :count="selectedUsers.length"
      :disabled="disabled || selectedUsers.length === 0"
      :type="pageType"
      @click-confirm="$emit('submit', selectedUsers)"
    />

  </form>

</template>


<script>

  import differenceWith from 'lodash/differenceWith';
  import responsiveWindowMixin from 'kolibri.coreVue.mixins.responsiveWindowMixin';
  import commonCoreStrings from 'kolibri.coreVue.mixins.commonCoreStrings';
  import PaginatedListContainer from 'kolibri.coreVue.components.PaginatedListContainer';
  import PaginatedListContainerWithBackend from './PaginatedListContainerWithBackend';
  import SelectionBottomBar from './SelectionBottomBar';
  import UserTable from './UserTable';

  export default {
    name: 'ClassEnrollForm',
    components: {
      SelectionBottomBar,
      // conditionally render paginated list container based on whether there are
      // more than one page of users
      PaginatedListContainer,
      PaginatedListContainerWithBackend,
      UserTable,
    },
    mixins: [commonCoreStrings, responsiveWindowMixin],
    props: {
      facilityUsers: {
        type: Array,
        required: true,
      },
      pageType: {
        type: String,
        required: true,
      },
      classUsers: {
        type: Array,
        required: false,
        default: () => [],
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      classId: {
        type: String,
        required: false,
        default: '',
      },
      totalPageNumber: {
        type: Number,
        required: false,
        default: 1,
      },
      totalUsers: {
        type: Number,
        required: false,
        default: 0,
      },
      isBackendPaginated: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    data() {
      return {
        selectedUsers: [],
      };
    },
    computed: {
      usersNotInClass() {
        return this.isBackendPaginated
          ? this.facilityUsers
          : differenceWith(this.facilityUsers, this.classUsers, (a, b) => a.id === b.id);
      },
      excludeMemberOf() {
        return this.classId;
      },
      totalPages() {
        return this.totalPageNumber;
      },
      userAssignmentType() {
        return this.pageType;
      },
      totalUsersCount() {
        return this.totalUsers;
      },
    },
    methods: {
      emptyMessageForItems(items, filterInput) {
        if (this.facilityUsers.length === 0) {
          return this.coreString('noUsersExistLabel');
        }
        if (this.usersNotInClass.length === 0) {
          return this.$tr('allUsersAlready');
        }
        if (items.length === 0 && filterInput !== '') {
          return this.$tr('noUsersMatch', { filterText: filterInput });
        }

        return '';
      },
    },
    $trs: {
      searchForUser: {
        message: 'Search for a user',
        context: 'Descriptive text which appears in the search field on the Facility > Users page.',
      },
      // TODO clarify empty state messages after string freeze
      noUsersMatch: {
        message: 'No users match the filter: "{filterText}"',
        context:
          'Message that displays on the Facility > Users page when a search for a user produces no results.',
      },
      allUsersAlready: {
        message: 'All users are already enrolled in this class',
        context:
          'If all the users in a facility are already enrolled in a class, no more can be added.',
      },
    },
  };

</script>


<style lang="scss" scoped>

  .footer {
    display: flex;
    justify-content: flex-end;
  }

</style>
