import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date; output: Date; }
  Email: { input: any; output: any; }
  JSON: { input: { [key: string]: any }; output: { [key: string]: any }; }
};

/** Represents an agent in the system, associated with a team, capable of performing tasks and using plugins. */
export type Agent = {
  __typename?: 'Agent';
  /** The audit history for the location. */
  audits: Array<Maybe<Audit>>;
  /** Unique primary key for the agent. */
  id: Scalars['ID']['output'];
  /** Timestamp of the last time the agent was seen. */
  last_seen?: Maybe<Scalars['DateTime']['output']>;
  /** Non-unique name of the agent. */
  name: Scalars['String']['output'];
  /** Plugins associated with the agent. */
  plugins: Array<Maybe<AgentsPlugin>>;
  /** Tasks assigned to the agent. */
  tasks: Array<Maybe<AgentsTask>>;
  /** The team to which the agent belongs. */
  team: Team;
};

/** Input for creating a new agent instance. */
export type AgentCreateInput = {
  /** The name of the agent. */
  name: Scalars['String']['input'];
};

/** Mutations for creating, updating, and deleting agents. */
export type AgentMutations = {
  __typename?: 'AgentMutations';
  /** Create a new agent. */
  create: Agent;
  /** Delete an agent by ID. */
  delete?: Maybe<Agent>;
  /** Update an existing agent. */
  update: Agent;
};


/** Mutations for creating, updating, and deleting agents. */
export type AgentMutationsCreateArgs = {
  input?: InputMaybe<AgentCreateInput>;
};


/** Mutations for creating, updating, and deleting agents. */
export type AgentMutationsDeleteArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations for creating, updating, and deleting agents. */
export type AgentMutationsUpdateArgs = {
  input?: InputMaybe<AgentUpdateInput>;
};

/** A paginated list of Agent items. */
export type AgentPaginator = {
  __typename?: 'AgentPaginator';
  /** A list of Agent items. */
  data: Array<Agent>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** Queries for retrieving agents. */
export type AgentQueries = {
  __typename?: 'AgentQueries';
  /** List multiple agents. */
  list: AgentPaginator;
  /** Find an agent by an identifying attribute. */
  single?: Maybe<Agent>;
};


/** Queries for retrieving agents. */
export type AgentQueriesListArgs = {
  first?: Scalars['Int']['input'];
  includeIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Queries for retrieving agents. */
export type AgentQueriesSingleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

/** Represents an Agent Response containing data returned from a task. */
export type AgentResponse = {
  __typename?: 'AgentResponse';
  /** The data returned from a task. */
  data: Scalars['String']['output'];
  /** Timestamp when this response was deleted. */
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  /** Unique primary key. */
  id: Scalars['ID']['output'];
  /** The task this response is for. */
  task?: Maybe<AgentsTask>;
};

/** Mutations for deleting and restoring Agent Responses. */
export type AgentResponseMutations = {
  __typename?: 'AgentResponseMutations';
  /** Delete an Agent Response by ID. */
  delete?: Maybe<AgentResponse>;
  /** Restore a soft-deleted Agent Response by ID. */
  restore?: Maybe<AgentResponse>;
};


/** Mutations for deleting and restoring Agent Responses. */
export type AgentResponseMutationsDeleteArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations for deleting and restoring Agent Responses. */
export type AgentResponseMutationsRestoreArgs = {
  id: Scalars['ID']['input'];
};

/** A paginated list of AgentResponse items. */
export type AgentResponsePaginator = {
  __typename?: 'AgentResponsePaginator';
  /** A list of AgentResponse items. */
  data: Array<AgentResponse>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** Queries for retrieving Agent Responses. */
export type AgentResponseQueries = {
  __typename?: 'AgentResponseQueries';
  /** List multiple responses. */
  list: AgentResponsePaginator;
  /** Find a response by an identifying attribute. */
  single?: Maybe<AgentResponse>;
};


/** Queries for retrieving Agent Responses. */
export type AgentResponseQueriesListArgs = {
  first?: Scalars['Int']['input'];
  includeIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Trashed>;
};


/** Queries for retrieving Agent Responses. */
export type AgentResponseQueriesSingleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  trashed?: InputMaybe<Trashed>;
};

/** Input for updating an existing agent instance. */
export type AgentUpdateInput = {
  /** Unique identifier of the agent. */
  id: Scalars['ID']['input'];
  /** The new name of the agent. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Update the plugins associated with the agent. */
  plugins?: InputMaybe<AgentsPluginUpdateBelongsToMany>;
};

export type AgentsMutations = {
  __typename?: 'AgentsMutations';
  plugin: AgentsPluginMutations;
  response: AgentResponseMutations;
  task: AgentsTaskMutations;
};

/** Represents an Agent Plugin. */
export type AgentsPlugin = {
  __typename?: 'AgentsPlugin';
  /** The commands associated with this plugin. */
  commands?: Maybe<Array<AgentsPluginsCommand>>;
  /** The description of the plugin. */
  description?: Maybe<Scalars['String']['output']>;
  /** Specifies if this plugin is a draft. */
  draft: Scalars['Boolean']['output'];
  /** The SHA512 hash of the script. */
  hash: Scalars['String']['output'];
  /** Unique primary key. */
  id: Scalars['ID']['output'];
  /** Non-unique name. */
  name: Scalars['String']['output'];
  /** The next version of this plugin. */
  next_version?: Maybe<AgentsPlugin>;
  /** The previous version of this plugin. */
  previous_version?: Maybe<AgentsPlugin>;
  /** Specifies if this plugin is publicly available. */
  public: Scalars['Boolean']['output'];
  /** The Python script for the plugin. */
  script: Scalars['String']['output'];
  /** The team this plugin belongs to if not public. */
  team?: Maybe<Team>;
  /** The version of the plugin in SemVer format. */
  version: Scalars['String']['output'];
};

/** Input for creating a new Agent Plugin instance. */
export type AgentsPluginCreateInput = {
  /** The commands associated with this plugin. */
  commands?: InputMaybe<AgentsPluginsCommandCreateHasMany>;
  description?: InputMaybe<Scalars['String']['input']>;
  draft: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  public: Scalars['Boolean']['input'];
  script: Scalars['String']['input'];
  version: Scalars['String']['input'];
};

/** Mutations for creating, updating, and deleting Agent Plugins. */
export type AgentsPluginMutations = {
  __typename?: 'AgentsPluginMutations';
  /** Create a new Agent Plugin. */
  create: AgentsPlugin;
  /** Delete an Agent Plugin by ID. */
  delete?: Maybe<AgentsPlugin>;
  /** Update an existing Agent Plugin. */
  update: AgentsPlugin;
};


/** Mutations for creating, updating, and deleting Agent Plugins. */
export type AgentsPluginMutationsCreateArgs = {
  input?: InputMaybe<AgentsPluginCreateInput>;
};


/** Mutations for creating, updating, and deleting Agent Plugins. */
export type AgentsPluginMutationsDeleteArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations for creating, updating, and deleting Agent Plugins. */
export type AgentsPluginMutationsUpdateArgs = {
  input?: InputMaybe<AgentsPluginUpdateInput>;
};

/** A paginated list of AgentsPlugin items. */
export type AgentsPluginPaginator = {
  __typename?: 'AgentsPluginPaginator';
  /** A list of AgentsPlugin items. */
  data: Array<AgentsPlugin>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** Queries for retrieving Agent Plugins. */
export type AgentsPluginQueries = {
  __typename?: 'AgentsPluginQueries';
  /** List multiple plugins. */
  list: AgentsPluginPaginator;
  /** Find a plugin by an identifying attribute. */
  single?: Maybe<AgentsPlugin>;
};


/** Queries for retrieving Agent Plugins. */
export type AgentsPluginQueriesListArgs = {
  first?: Scalars['Int']['input'];
  includeIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Queries for retrieving Agent Plugins. */
export type AgentsPluginQueriesSingleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

/** Input for managing the relationships of Agent Plugins in a BelongsToMany context. */
export type AgentsPluginUpdateBelongsToMany = {
  connect?: InputMaybe<Array<Scalars['ID']['input']>>;
  create?: InputMaybe<Array<AgentsPluginCreateInput>>;
  delete?: InputMaybe<Array<Scalars['ID']['input']>>;
  disconnect?: InputMaybe<Array<Scalars['ID']['input']>>;
  sync?: InputMaybe<Array<Scalars['ID']['input']>>;
  syncWithoutDetaching?: InputMaybe<Array<Scalars['ID']['input']>>;
  update?: InputMaybe<Array<AgentsPluginUpdateInput>>;
  upsert?: InputMaybe<Array<AgentsPluginUpsertInput>>;
};

/** Input for updating an existing Agent Plugin instance. */
export type AgentsPluginUpdateInput = {
  /** The new commands associated with this plugin. */
  commands?: InputMaybe<AgentsPluginsCommandUpdateHasMany>;
  /** The new description of the plugin. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Specifies if the plugin is a draft. */
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  /** Unique identifier of the plugin. */
  id: Scalars['ID']['input'];
  /** The new name of the plugin. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specifies if the plugin is publicly available. */
  public?: InputMaybe<Scalars['Boolean']['input']>;
  /** The new Python script for the plugin. */
  script?: InputMaybe<Scalars['String']['input']>;
  /** The new version of the plugin. */
  version?: InputMaybe<Scalars['String']['input']>;
};

/** Input for upserting an existing Agent Plugin instance. */
export type AgentsPluginUpsertInput = {
  /** The new commands associated with this plugin. */
  commands?: InputMaybe<AgentsPluginsCommandCreateHasMany>;
  /** The new description of the plugin. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Specifies if the plugin is a draft. */
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  /** Unique identifier of the plugin. */
  id: Scalars['ID']['input'];
  /** The new name of the plugin. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specifies if the plugin is publicly available. */
  public?: InputMaybe<Scalars['Boolean']['input']>;
  /** The new Python script for the plugin. */
  script?: InputMaybe<Scalars['String']['input']>;
  /** The new version of the plugin. */
  version?: InputMaybe<Scalars['String']['input']>;
};

/** Represents an argument for Agent Plugins. */
export type AgentsPluginsArgument = {
  __typename?: 'AgentsPluginsArgument';
  /** The command that this argument belongs to. */
  command: AgentsPluginsCommand;
  /** The description of the argument. */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique primary key. */
  id: Scalars['ID']['output'];
  /** The name of the argument. */
  name: Scalars['String']['output'];
  /** Specifies if this argument is required. */
  required: Scalars['Boolean']['output'];
  /** The type of the argument. */
  type: Scalars['String']['output'];
};

/** Input for updating multiple AgentsPluginsArgument instances. */
export type AgentsPluginsArgumentCreateHasMany = {
  connect?: InputMaybe<Array<Scalars['ID']['input']>>;
  create?: InputMaybe<Array<AgentsPluginsArgumentCreateInput>>;
  delete?: InputMaybe<Array<Scalars['ID']['input']>>;
  disconnect?: InputMaybe<Array<Scalars['ID']['input']>>;
  update?: InputMaybe<Array<AgentsPluginsArgumentUpdateInput>>;
  upsert?: InputMaybe<Array<AgentsPluginsArgumentUpsertInput>>;
};

/** Input for creating a new AgentsPluginsArgument instance. */
export type AgentsPluginsArgumentCreateInput = {
  /** The description of the argument. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The name of the argument. */
  name: Scalars['String']['input'];
  /** Specifies if this argument is required. */
  required: Scalars['Boolean']['input'];
  /** The type of the argument. */
  type: Scalars['String']['input'];
};

/** Input for updating an existing AgentsPluginsArgument instance. */
export type AgentsPluginsArgumentUpdateInput = {
  /** The new description of the argument. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Unique identifier of the argument. */
  id: Scalars['ID']['input'];
  /** The new name of the argument. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specifies if this argument is required. */
  required?: InputMaybe<Scalars['Boolean']['input']>;
  /** The new type of the argument. */
  type?: InputMaybe<Scalars['String']['input']>;
};

/** Input for upserting an AgentsPluginsArgument instance. */
export type AgentsPluginsArgumentUpsertInput = {
  /** The new description of the argument. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Unique identifier of the argument. */
  id: Scalars['ID']['input'];
  /** The new name of the argument. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specifies if this argument is required. */
  required?: InputMaybe<Scalars['Boolean']['input']>;
  /** The new type of the argument. */
  type?: InputMaybe<Scalars['String']['input']>;
};

/** Represents a command for Agent Plugins. */
export type AgentsPluginsCommand = {
  __typename?: 'AgentsPluginsCommand';
  /** The arguments for this command. */
  arguments: Array<Maybe<AgentsPluginsArgument>>;
  /** The command description. */
  description?: Maybe<Scalars['String']['output']>;
  /** The function to call on the plugin. */
  function: Scalars['String']['output'];
  /** Unique primary key. */
  id: Scalars['ID']['output'];
  /** The name of the command. */
  name: Scalars['String']['output'];
  /** The plugin this command belongs to. */
  plugin: AgentsPlugin;
};

/** Input for creating multiple AgentsPluginsCommand instances. */
export type AgentsPluginsCommandCreateHasMany = {
  create: Array<AgentsPluginsCommandCreateInput>;
};

/** Input for creating a new AgentsPluginsCommand instance. */
export type AgentsPluginsCommandCreateInput = {
  /** Arguments for this command. */
  arguments?: InputMaybe<AgentsPluginsArgumentCreateHasMany>;
  /** The description of the command. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The function to call on the plugin. */
  function: Scalars['String']['input'];
  /** The name of the command. */
  name: Scalars['String']['input'];
};

/** A paginated list of AgentsPluginsCommand items. */
export type AgentsPluginsCommandPaginator = {
  __typename?: 'AgentsPluginsCommandPaginator';
  /** A list of AgentsPluginsCommand items. */
  data: Array<AgentsPluginsCommand>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** Queries for retrieving Agent Plugins Commands. */
export type AgentsPluginsCommandQueries = {
  __typename?: 'AgentsPluginsCommandQueries';
  /** List multiple commands. */
  list: AgentsPluginsCommandPaginator;
  /** Find a command by an identifying attribute. */
  single?: Maybe<AgentsPluginsCommand>;
};


/** Queries for retrieving Agent Plugins Commands. */
export type AgentsPluginsCommandQueriesListArgs = {
  first?: Scalars['Int']['input'];
  includeIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pluginIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


/** Queries for retrieving Agent Plugins Commands. */
export type AgentsPluginsCommandQueriesSingleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

/** Input for updating multiple AgentsPluginsCommand instances. */
export type AgentsPluginsCommandUpdateHasMany = {
  connect?: InputMaybe<Array<Scalars['ID']['input']>>;
  create?: InputMaybe<Array<AgentsPluginsCommandCreateInput>>;
  delete?: InputMaybe<Array<Scalars['ID']['input']>>;
  disconnect?: InputMaybe<Array<Scalars['ID']['input']>>;
  update?: InputMaybe<Array<AgentsPluginsCommandUpdateInput>>;
  upsert?: InputMaybe<Array<AgentsPluginsCommandUpsertInput>>;
};

/** Input for updating an existing AgentsPluginsCommand instance. */
export type AgentsPluginsCommandUpdateInput = {
  /** New arguments for this command. */
  arguments?: InputMaybe<AgentsPluginsArgumentCreateHasMany>;
  /** The new description of the command. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The new function to call on the plugin. */
  function?: InputMaybe<Scalars['String']['input']>;
  /** Unique identifier of the command. */
  id: Scalars['ID']['input'];
  /** The new name of the command. */
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Input for upserting an AgentsPluginsCommand instance. */
export type AgentsPluginsCommandUpsertInput = {
  /** New arguments for this command. */
  arguments?: InputMaybe<AgentsPluginsArgumentCreateHasMany>;
  /** The new description of the command. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The new function to call on the plugin. */
  function?: InputMaybe<Scalars['String']['input']>;
  /** Unique identifier of the command. */
  id: Scalars['ID']['input'];
  /** The new name of the command. */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type AgentsQueries = {
  __typename?: 'AgentsQueries';
  plugin: AgentsPluginQueries;
  plugins: PluginsQueries;
  response: AgentResponseQueries;
  task: AgentsTaskQueries;
};

/** Represents an Agent Task, specifying a task to be run by an agent. */
export type AgentsTask = {
  __typename?: 'AgentsTask';
  /** The agent that should run this task. */
  agent: Agent;
  /** The arguments to pass to the command. */
  arguments: Scalars['String']['output'];
  /** The command for this task. */
  command: AgentsPluginsCommand;
  /** The cron schedule in which to run the task, if recurring. */
  cron?: Maybe<Scalars['String']['output']>;
  /** Timestamp when this task was deleted. */
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  /** Unique primary key. */
  id: Scalars['ID']['output'];
  /** Responses generated by running this task. */
  responses: Array<Maybe<AgentResponse>>;
};

/** Input for creating a new Agent Task instance. */
export type AgentsTaskCreateInput = {
  /** The ID of the agent that should run this task. */
  agent_id: Scalars['ID']['input'];
  /** The arguments to pass to the command. */
  arguments: Scalars['String']['input'];
  /** The ID of the command for this task. */
  command_id: Scalars['ID']['input'];
  /** The cron schedule in which to run the task, if recurring. */
  cron?: InputMaybe<Scalars['String']['input']>;
};

/** Mutations for creating, updating, deleting, and restoring Agent Tasks. */
export type AgentsTaskMutations = {
  __typename?: 'AgentsTaskMutations';
  /** Create a new Agent Task. */
  create: AgentsTask;
  /** Delete an Agent Task by ID. */
  delete?: Maybe<AgentsTask>;
  /** Restore a soft-deleted Agent Task by ID. */
  restore?: Maybe<AgentsTask>;
  /** Update an existing Agent Task. */
  update: AgentsTask;
};


/** Mutations for creating, updating, deleting, and restoring Agent Tasks. */
export type AgentsTaskMutationsCreateArgs = {
  input?: InputMaybe<AgentsTaskCreateInput>;
};


/** Mutations for creating, updating, deleting, and restoring Agent Tasks. */
export type AgentsTaskMutationsDeleteArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations for creating, updating, deleting, and restoring Agent Tasks. */
export type AgentsTaskMutationsRestoreArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations for creating, updating, deleting, and restoring Agent Tasks. */
export type AgentsTaskMutationsUpdateArgs = {
  input?: InputMaybe<AgentsTaskUpdateInput>;
};

/** A paginated list of AgentsTask items. */
export type AgentsTaskPaginator = {
  __typename?: 'AgentsTaskPaginator';
  /** A list of AgentsTask items. */
  data: Array<AgentsTask>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** Queries for retrieving Agent Tasks. */
export type AgentsTaskQueries = {
  __typename?: 'AgentsTaskQueries';
  /** List multiple tasks. */
  list: AgentsTaskPaginator;
  /** Find a task by an identifying attribute. */
  single?: Maybe<AgentsTask>;
};


/** Queries for retrieving Agent Tasks. */
export type AgentsTaskQueriesListArgs = {
  first?: Scalars['Int']['input'];
  includeIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  trashed?: InputMaybe<Trashed>;
};


/** Queries for retrieving Agent Tasks. */
export type AgentsTaskQueriesSingleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  trashed?: InputMaybe<Trashed>;
};

/** Input for updating an existing Agent Task instance. */
export type AgentsTaskUpdateInput = {
  /** The new arguments to pass to the command. */
  arguments?: InputMaybe<Scalars['String']['input']>;
  /** The new cron schedule in which to run the task, if recurring. */
  cron?: InputMaybe<Scalars['String']['input']>;
  /** Unique identifier of the task. */
  id: Scalars['ID']['input'];
};

/** Represents an audit log capturing changes in the system. */
export type Audit = {
  __typename?: 'Audit';
  /** ID of the audited resource. */
  auditable_id: Scalars['ID']['output'];
  /** Type of the audited resource. */
  auditable_type: Scalars['String']['output'];
  /** Timestamp when the audit event was created. */
  created_at: Scalars['DateTime']['output'];
  /** Description of the audit event. */
  event: Scalars['String']['output'];
  /** Unique primary key for the audit log. */
  id: Scalars['ID']['output'];
  /** IP address associated with the audit event. */
  ip_address: Scalars['String']['output'];
  /** New values of the audited resource. */
  new_values: Scalars['JSON']['output'];
  /** Old values of the audited resource. */
  old_values: Scalars['JSON']['output'];
  /** Tags associated with the audit event. */
  tags?: Maybe<Scalars['String']['output']>;
  /** URL related to the audit event. */
  url?: Maybe<Scalars['String']['output']>;
  /** The user or agent associated with the audit event. */
  user: Auditer;
  /** User agent string from the audit event. */
  user_agent: Scalars['String']['output'];
};

/** A paginated list of Audit items. */
export type AuditPaginator = {
  __typename?: 'AuditPaginator';
  /** A list of Audit items. */
  data: Array<Audit>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** Queries for retrieving audits. */
export type AuditQueries = {
  __typename?: 'AuditQueries';
  /** List multiple audits based on optional filters. */
  list: AuditPaginator;
};


/** Queries for retrieving audits. */
export type AuditQueriesListArgs = {
  auditable_id?: InputMaybe<Scalars['ID']['input']>;
  auditable_type?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  includeIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

/** Represents either a User or an Agent, forming a union type for auditing purposes. */
export type Auditer = Agent | User;

/** Namespace for authentication mutations. */
export type AuthMutations = {
  __typename?: 'AuthMutations';
  forgotPassword: ForgotPasswordResponse;
  login: AuthPayload;
  logout: LogoutResponse;
  refreshToken: RefreshTokenPayload;
  register: RegisterResponse;
  socialLogin: AuthPayload;
  updateForgottenPassword: ForgotPasswordResponse;
  updatePassword: UpdatePasswordResponse;
  verifyEmail: AuthPayload;
};


/** Namespace for authentication mutations. */
export type AuthMutationsForgotPasswordArgs = {
  input: ForgotPasswordInput;
};


/** Namespace for authentication mutations. */
export type AuthMutationsLoginArgs = {
  input?: InputMaybe<LoginInput>;
};


/** Namespace for authentication mutations. */
export type AuthMutationsRefreshTokenArgs = {
  input?: InputMaybe<RefreshTokenInput>;
};


/** Namespace for authentication mutations. */
export type AuthMutationsRegisterArgs = {
  input?: InputMaybe<RegisterInput>;
};


/** Namespace for authentication mutations. */
export type AuthMutationsSocialLoginArgs = {
  input: SocialLoginInput;
};


/** Namespace for authentication mutations. */
export type AuthMutationsUpdateForgottenPasswordArgs = {
  input?: InputMaybe<NewPasswordWithCodeInput>;
};


/** Namespace for authentication mutations. */
export type AuthMutationsUpdatePasswordArgs = {
  input: UpdatePassword;
};


/** Namespace for authentication mutations. */
export type AuthMutationsVerifyEmailArgs = {
  input: VerifyEmailInput;
};

/** Payload returned upon successful authentication. */
export type AuthPayload = {
  __typename?: 'AuthPayload';
  access_token?: Maybe<Scalars['String']['output']>;
  expires_in?: Maybe<Scalars['Int']['output']>;
  refresh_token?: Maybe<Scalars['String']['output']>;
  token_type?: Maybe<Scalars['String']['output']>;
  user?: Maybe<CurrentUser>;
};

/** Represents an attachment in the Core module. */
export type CoreAttachment = {
  __typename?: 'CoreAttachment';
  /** The audit history for the location. */
  audits: Array<Maybe<Audit>>;
  /** The content type of the attachment. */
  content_type?: Maybe<Scalars['String']['output']>;
  /** Timestamp when the attachment was created. */
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  /** The link to the attachment. */
  link: Scalars['String']['output'];
  /** The name of the attachment. */
  name: Scalars['String']['output'];
  /** The size of the attachment in bytes. */
  size: Scalars['Int']['output'];
  /** Timestamp when the attachment was last updated. */
  updated_at: Scalars['DateTime']['output'];
};

/** Input for managing the relationships of Core Attachments in a BelongsToMany context. */
export type CoreAttachmentCreateBelongsToMany = {
  /** List of attachment IDs to connect. */
  connect?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** List of attachments to create. */
  create?: InputMaybe<Array<CoreAttachmentCreateInput>>;
  /** List of attachment IDs to synchronize with. */
  sync?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** List of attachments to upsert. */
  upsert?: InputMaybe<Array<CoreAttachmentUpsertInput>>;
};

/** Input for creating a new Core Attachment instance. */
export type CoreAttachmentCreateInput = {
  /** The file to upload as the attachment. */
  file: VaporFileUpload;
  /** The name of the attachment. */
  name: Scalars['String']['input'];
  /** The size of the attachment in bytes. */
  size: Scalars['Int']['input'];
};

/** Mutations for deleting Core Attachments. */
export type CoreAttachmentMutations = {
  __typename?: 'CoreAttachmentMutations';
  /** Delete an attachment by ID. */
  delete?: Maybe<CoreAttachment>;
};


/** Mutations for deleting Core Attachments. */
export type CoreAttachmentMutationsDeleteArgs = {
  id: Scalars['ID']['input'];
};

/** A paginated list of CoreAttachment items. */
export type CoreAttachmentPaginator = {
  __typename?: 'CoreAttachmentPaginator';
  /** A list of CoreAttachment items. */
  data: Array<CoreAttachment>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** Queries for retrieving Core Attachments. */
export type CoreAttachmentQueries = {
  __typename?: 'CoreAttachmentQueries';
  /** List multiple attachments. */
  list: CoreAttachmentPaginator;
  /** Find an attachment by an identifying attribute. */
  single?: Maybe<CoreAttachment>;
};


/** Queries for retrieving Core Attachments. */
export type CoreAttachmentQueriesListArgs = {
  first?: Scalars['Int']['input'];
  includeIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Queries for retrieving Core Attachments. */
export type CoreAttachmentQueriesSingleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

/** Input for upserting an existing Core Attachment instance. */
export type CoreAttachmentUpsertInput = {
  /** Unique identifier of the attachment. */
  id: Scalars['ID']['input'];
  /** The new name of the attachment. */
  name: Scalars['String']['input'];
  /** The new size of the attachment in bytes. */
  size?: InputMaybe<Scalars['Int']['input']>;
};

/** Represents a contact in the Core module. */
export type CoreContact = {
  __typename?: 'CoreContact';
  /** The attachments for the contact. */
  attachments: Array<Maybe<CoreAttachment>>;
  /** The audit history for the location. */
  audits: Array<Maybe<Audit>>;
  /** The company to which the contact belongs. */
  company?: Maybe<CoreContact>;
  /** The ID of the company to which the contact belongs. */
  company_id?: Maybe<Scalars['ID']['output']>;
  /** Timestamp when the contact was created. */
  created_at: Scalars['DateTime']['output'];
  /** Optional description for the contact. */
  description?: Maybe<Scalars['String']['output']>;
  /** The devices associated with the contact. */
  devices: Array<Maybe<CoreDevice>>;
  /** The email address of the contact. */
  email?: Maybe<Scalars['String']['output']>;
  /** Employees associated with the contact. */
  employees?: Maybe<Array<CoreContact>>;
  id: Scalars['ID']['output'];
  /** The locations associated with the contact. */
  locations: Array<Maybe<CoreLocation>>;
  /** The name of the contact. */
  name: Scalars['String']['output'];
  /** The networks associated with the contact. */
  networks: Array<Maybe<CoreNetwork>>;
  /** The notes for the contact. */
  notes: Array<Maybe<CoreNote>>;
  /** The phone number of the contact. */
  phone?: Maybe<Scalars['String']['output']>;
  /** The URL of the contact's profile photo. */
  photo?: Maybe<Scalars['String']['output']>;
  /** The type of the contact, either company or person. */
  type: CoreContactTypes;
  /** Timestamp when the contact was last updated. */
  updated_at: Scalars['DateTime']['output'];
};

/** Input for managing the relationships of Core Contacts in a BelongsToMany context. */
export type CoreContactCreateBelongsToMany = {
  /** List of contact IDs to connect. */
  connect?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** List of contacts to create. */
  create?: InputMaybe<Array<CoreContactCreateInput>>;
  /** List of contact IDs to synchronize with. */
  sync?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** List of contacts to upsert. */
  upsert?: InputMaybe<Array<CoreContactUpsertInput>>;
};

/** Input for creating a new Core Contact instance. */
export type CoreContactCreateInput = {
  /** Attachments associated with the contact. */
  attachments?: InputMaybe<CoreAttachmentCreateBelongsToMany>;
  /** The ID of the company to which the contact belongs. */
  company_id?: InputMaybe<Scalars['ID']['input']>;
  /** Optional description for the contact. */
  description?: InputMaybe<Scalars['String']['input']>;
  devices?: InputMaybe<CoreDeviceCreateBelongsToMany>;
  /** The email address of the contact. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** The file to upload as the contact's profile photo. */
  file?: InputMaybe<VaporFileUpload>;
  locations?: InputMaybe<CoreLocationCreateBelongsToMany>;
  /** The name of the contact. */
  name: Scalars['String']['input'];
  networks?: InputMaybe<CoreNetworkCreateBelongsToMany>;
  /** Notes associated with the contact. */
  notes?: InputMaybe<CoreNoteCreateBelongsToMany>;
  /** The phone number of the contact. */
  phone?: InputMaybe<Scalars['String']['input']>;
  /** The type of the contact, either company or person. */
  type: CoreContactTypes;
};

/** Mutations for creating, updating, and deleting Core Contacts. */
export type CoreContactMutations = {
  __typename?: 'CoreContactMutations';
  /** Create a new Core Contact. */
  create: CoreContact;
  /** Delete a Core Contact by ID. */
  delete?: Maybe<CoreContact>;
  /** Update an existing Core Contact. */
  update: CoreContact;
};


/** Mutations for creating, updating, and deleting Core Contacts. */
export type CoreContactMutationsCreateArgs = {
  input: CoreContactCreateInput;
};


/** Mutations for creating, updating, and deleting Core Contacts. */
export type CoreContactMutationsDeleteArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations for creating, updating, and deleting Core Contacts. */
export type CoreContactMutationsUpdateArgs = {
  input?: InputMaybe<CoreContactUpdateInput>;
};

/** A paginated list of CoreContact items. */
export type CoreContactPaginator = {
  __typename?: 'CoreContactPaginator';
  /** A list of CoreContact items. */
  data: Array<CoreContact>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** Queries for retrieving Core Contacts. */
export type CoreContactQueries = {
  __typename?: 'CoreContactQueries';
  /** List multiple contacts. */
  list: CoreContactPaginator;
  /** Find a contact by an identifying attribute. */
  single?: Maybe<CoreContact>;
};


/** Queries for retrieving Core Contacts. */
export type CoreContactQueriesListArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  includeIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<CoreContactTypes>;
};


/** Queries for retrieving Core Contacts. */
export type CoreContactQueriesSingleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Type representing the different types of Core Contacts, either company or person. */
export enum CoreContactTypes {
  COMPANY = 'COMPANY',
  PERSON = 'PERSON'
}

/** Input for updating an existing Core Contact instance. */
export type CoreContactUpdateInput = {
  /** New attachments associated with the contact. */
  attachments?: InputMaybe<CoreAttachmentCreateBelongsToMany>;
  /** The new ID of the company to which the contact belongs. */
  company_id?: InputMaybe<Scalars['ID']['input']>;
  /** The new description for the contact. */
  description?: InputMaybe<Scalars['String']['input']>;
  devices?: InputMaybe<CoreDeviceCreateBelongsToMany>;
  /** The new email address of the contact. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** The new file to upload as the contact's profile photo. */
  file?: InputMaybe<VaporFileUpload>;
  /** Unique identifier of the contact. */
  id: Scalars['ID']['input'];
  locations?: InputMaybe<CoreLocationCreateBelongsToMany>;
  /** The new name of the contact. */
  name?: InputMaybe<Scalars['String']['input']>;
  networks?: InputMaybe<CoreNetworkCreateBelongsToMany>;
  /** New notes associated with the contact. */
  notes?: InputMaybe<CoreNoteCreateBelongsToMany>;
  /** The new phone number of the contact. */
  phone?: InputMaybe<Scalars['String']['input']>;
  /** The new type of the contact, either company or person. */
  type?: InputMaybe<CoreContactTypes>;
};

/** Input for upserting an existing Core Contact instance. */
export type CoreContactUpsertInput = {
  /** New attachments associated with the contact. */
  attachments?: InputMaybe<CoreAttachmentCreateBelongsToMany>;
  /** The new ID of the company to which the contact belongs. */
  company_id?: InputMaybe<Scalars['ID']['input']>;
  /** The new description for the contact. */
  description?: InputMaybe<Scalars['String']['input']>;
  devices?: InputMaybe<CoreDeviceCreateBelongsToMany>;
  /** The new email address of the contact. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** The new file to upload as the contact's profile photo. */
  file?: InputMaybe<VaporFileUpload>;
  /** Unique identifier of the contact. */
  id?: InputMaybe<Scalars['ID']['input']>;
  locations?: InputMaybe<CoreLocationCreateBelongsToMany>;
  /** The new name of the contact. */
  name?: InputMaybe<Scalars['String']['input']>;
  networks?: InputMaybe<CoreNetworkCreateBelongsToMany>;
  /** New notes associated with the contact. */
  notes?: InputMaybe<CoreNoteCreateBelongsToMany>;
  /** The new phone number of the contact. */
  phone?: InputMaybe<Scalars['String']['input']>;
  /** The new type of the contact, either company or person. */
  type?: InputMaybe<CoreContactTypes>;
};

/** Represents a device in the Core module. */
export type CoreDevice = {
  __typename?: 'CoreDevice';
  /** The addresses associated with the device. */
  addresses: Array<Maybe<CoreNetworksAddress>>;
  /** The attachments associated with the device. */
  attachments: Array<Maybe<CoreAttachment>>;
  /** The audit history for the location. */
  audits: Array<Maybe<Audit>>;
  /** The contacts associated with the device. */
  contacts: Array<Maybe<CoreContact>>;
  /** Timestamp when the device was created. */
  created_at: Scalars['DateTime']['output'];
  /** Optional description for the device. */
  description?: Maybe<Scalars['String']['output']>;
  /** The hostname of the device. */
  hostname?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** The locations associated with the device. */
  locations: Array<Maybe<CoreLocation>>;
  /** The name of the device. */
  name: Scalars['String']['output'];
  /** The networks the device is connected to. */
  networks: Array<Maybe<CoreNetwork>>;
  /** The notes for the device. */
  notes: Array<Maybe<CoreNote>>;
  /** The type of the device, such as server, workstation, printer, laptop, or other. */
  type: CoreDeviceTypes;
  /** Timestamp when the device was last updated. */
  updated_at: Scalars['DateTime']['output'];
};

/** Input for connecting multiple devices. */
export type CoreDeviceCreateBelongsToMany = {
  connect?: InputMaybe<Array<Scalars['ID']['input']>>;
  create?: InputMaybe<Array<CoreDeviceCreateInput>>;
  sync?: InputMaybe<Array<Scalars['ID']['input']>>;
  upsert?: InputMaybe<Array<CoreDeviceUpsertInput>>;
};

/** Input for creating a new Core Device instance. */
export type CoreDeviceCreateInput = {
  /** Addresses associated with the device. */
  addresses?: InputMaybe<CoreNetworksAddressCreateBelongsToMany>;
  /** Attachments associated with the device. */
  attachments?: InputMaybe<CoreAttachmentCreateBelongsToMany>;
  /** Contacts associated with the device. */
  contacts?: InputMaybe<CoreContactCreateBelongsToMany>;
  /** Optional description for the device. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The hostname of the device. */
  hostname?: InputMaybe<Scalars['String']['input']>;
  /** Locations associated with the device. */
  locations?: InputMaybe<CoreLocationCreateBelongsToMany>;
  /** The name of the device. */
  name: Scalars['String']['input'];
  /** Notes associated with the device. */
  notes?: InputMaybe<CoreNoteCreateBelongsToMany>;
  /** The type of the device, such as server, workstation, printer, laptop, or other. */
  type: CoreDeviceTypes;
};

/** Mutations for creating, updating, and deleting Core Devices. */
export type CoreDeviceMutations = {
  __typename?: 'CoreDeviceMutations';
  /** Create a new Core Device. */
  create: CoreDevice;
  /** Delete a Core Device by ID. */
  delete?: Maybe<CoreDevice>;
  /** Update an existing Core Device. */
  update: CoreDevice;
};


/** Mutations for creating, updating, and deleting Core Devices. */
export type CoreDeviceMutationsCreateArgs = {
  input: CoreDeviceCreateInput;
};


/** Mutations for creating, updating, and deleting Core Devices. */
export type CoreDeviceMutationsDeleteArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations for creating, updating, and deleting Core Devices. */
export type CoreDeviceMutationsUpdateArgs = {
  input: CoreDeviceUpdateInput;
};

/** A paginated list of CoreDevice items. */
export type CoreDevicePaginator = {
  __typename?: 'CoreDevicePaginator';
  /** A list of CoreDevice items. */
  data: Array<CoreDevice>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** Queries for retrieving Core Devices. */
export type CoreDeviceQueries = {
  __typename?: 'CoreDeviceQueries';
  /** List multiple devices. */
  list: CoreDevicePaginator;
  /** Find a device by an identifying attribute. */
  single?: Maybe<CoreDevice>;
};


/** Queries for retrieving Core Devices. */
export type CoreDeviceQueriesListArgs = {
  first?: Scalars['Int']['input'];
  hostname?: InputMaybe<Scalars['String']['input']>;
  includeIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<CoreDeviceTypes>;
};


/** Queries for retrieving Core Devices. */
export type CoreDeviceQueriesSingleArgs = {
  hostname?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Enum representing different types of Core Devices, such as server, workstation, printer, laptop, or other. */
export enum CoreDeviceTypes {
  LAPTOP = 'LAPTOP',
  OTHER = 'OTHER',
  PRINTER = 'PRINTER',
  SERVER = 'SERVER',
  WORKSTATION = 'WORKSTATION'
}

/** Input for updating an existing Core Device instance. */
export type CoreDeviceUpdateInput = {
  /** New addresses associated with the device. */
  addresses?: InputMaybe<CoreNetworksAddressCreateBelongsToMany>;
  /** New attachments associated with the device. */
  attachments?: InputMaybe<CoreAttachmentCreateBelongsToMany>;
  /** New contacts associated with the device. */
  contacts?: InputMaybe<CoreContactCreateBelongsToMany>;
  /** The new description for the device. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The hostname of the device. */
  hostname?: InputMaybe<Scalars['String']['input']>;
  /** Unique identifier of the device. */
  id: Scalars['ID']['input'];
  /** New locations associated with the device. */
  locations?: InputMaybe<CoreLocationCreateBelongsToMany>;
  /** The new name of the device. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** New notes associated with the device. */
  notes?: InputMaybe<CoreNoteCreateBelongsToMany>;
  /** The new type of the device, such as server, workstation, printer, laptop, or other. */
  type?: InputMaybe<CoreDeviceTypes>;
};

/** Input for upserting a Core Device instance. */
export type CoreDeviceUpsertInput = {
  /** New addresses associated with the device. */
  addresses?: InputMaybe<CoreNetworksAddressCreateBelongsToMany>;
  /** New attachments associated with the device. */
  attachments?: InputMaybe<CoreAttachmentCreateBelongsToMany>;
  /** New contacts associated with the device. */
  contacts?: InputMaybe<CoreContactCreateBelongsToMany>;
  /** The new description for the device. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The hostname of the device. */
  hostname?: InputMaybe<Scalars['String']['input']>;
  /** Unique identifier of the location, if updating an existing location. */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** New locations associated with the device. */
  locations?: InputMaybe<CoreLocationCreateBelongsToMany>;
  /** The new name of the device. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** New notes associated with the device. */
  notes?: InputMaybe<CoreNoteCreateBelongsToMany>;
  /** The new type of the device, such as server, workstation, printer, laptop, or other. */
  type?: InputMaybe<CoreDeviceTypes>;
};

/** A Location stores information about the real-world location of things. */
export type CoreLocation = {
  __typename?: 'CoreLocation';
  /** The street address of the location. */
  address?: Maybe<Scalars['String']['output']>;
  /** The attachments associated with the location. */
  attachments: Array<Maybe<CoreAttachment>>;
  /** The audit history for the location. */
  audits: Array<Maybe<Audit>>;
  /** The children locations of this location. */
  children_locations: Array<Maybe<CoreLocation>>;
  /** The contacts associated with the location. */
  contacts: Array<Maybe<CoreContact>>;
  /** Timestamp when the location was created. */
  created_at: Scalars['DateTime']['output'];
  /** The description of the location. */
  description?: Maybe<Scalars['String']['output']>;
  /** The devices at the location. */
  devices: Array<Maybe<CoreDevice>>;
  /** The UUID of the location. */
  id: Scalars['ID']['output'];
  /** The name of the location. */
  name: Scalars['String']['output'];
  /** The networks at the location. */
  networks: Array<Maybe<CoreNetwork>>;
  /** The notes associated with the location. */
  notes: Array<Maybe<CoreNote>>;
  /** The UUID of the parent location. */
  parent_id?: Maybe<Scalars['ID']['output']>;
  /** The parent location of this location. */
  parent_location?: Maybe<CoreLocation>;
  /** The type of location, such as building, room, rack, or other. */
  type: CoreLocationTypes;
  /** Timestamp when the location was last updated. */
  updated_at: Scalars['DateTime']['output'];
};

/** Input for connecting multiple locations. */
export type CoreLocationCreateBelongsToMany = {
  connect?: InputMaybe<Array<Scalars['ID']['input']>>;
  create?: InputMaybe<Array<CoreLocationCreateInput>>;
  sync?: InputMaybe<Array<Scalars['ID']['input']>>;
  upsert?: InputMaybe<Array<CoreLocationUpsertInput>>;
};

/** Input for creating a new Core Location instance. */
export type CoreLocationCreateInput = {
  /** The street address of the location. */
  address?: InputMaybe<Scalars['String']['input']>;
  /** Attachments associated with the location. */
  attachments?: InputMaybe<CoreAttachmentCreateBelongsToMany>;
  /** Contacts associated with the location. */
  contacts?: InputMaybe<CoreContactCreateBelongsToMany>;
  /** Optional description for the location. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Devices associated with the location. */
  devices?: InputMaybe<CoreDeviceCreateBelongsToMany>;
  /** The name of the location. */
  name: Scalars['String']['input'];
  /** Networks associated with the location. */
  networks?: InputMaybe<CoreNetworkCreateBelongsToMany>;
  /** Notes associated with the location. */
  notes?: InputMaybe<CoreNoteCreateBelongsToMany>;
  /** The ID of the parent location, if applicable. */
  parent_id?: InputMaybe<Scalars['ID']['input']>;
  /** The type of the location, such as building, room, rack, or other. */
  type: CoreLocationTypes;
};

/** Mutations for creating, updating, and deleting Core Locations. */
export type CoreLocationMutations = {
  __typename?: 'CoreLocationMutations';
  /** Create a new Core Location. */
  create: CoreLocation;
  /** Delete a Core Location by ID. */
  delete?: Maybe<CoreLocation>;
  /** Update an existing Core Location. */
  update?: Maybe<CoreLocation>;
};


/** Mutations for creating, updating, and deleting Core Locations. */
export type CoreLocationMutationsCreateArgs = {
  input?: InputMaybe<CoreLocationCreateInput>;
};


/** Mutations for creating, updating, and deleting Core Locations. */
export type CoreLocationMutationsDeleteArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations for creating, updating, and deleting Core Locations. */
export type CoreLocationMutationsUpdateArgs = {
  input?: InputMaybe<CoreLocationUpdateInput>;
};

/** A paginated list of CoreLocation items. */
export type CoreLocationPaginator = {
  __typename?: 'CoreLocationPaginator';
  /** A list of CoreLocation items. */
  data: Array<CoreLocation>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** Queries for retrieving Core Locations. */
export type CoreLocationQueries = {
  __typename?: 'CoreLocationQueries';
  /** List multiple locations. */
  list: CoreLocationPaginator;
  /** Find a location by an identifying attribute. */
  single?: Maybe<CoreLocation>;
};


/** Queries for retrieving Core Locations. */
export type CoreLocationQueriesListArgs = {
  first?: Scalars['Int']['input'];
  includeIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<CoreLocationTypes>;
};


/** Queries for retrieving Core Locations. */
export type CoreLocationQueriesSingleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Enum representing different types of Core Locations, such as building, room, rack, or other. */
export enum CoreLocationTypes {
  BUILDING = 'BUILDING',
  OTHER = 'OTHER',
  RACK = 'RACK',
  ROOM = 'ROOM'
}

/** Input for updating an existing Core Location instance. */
export type CoreLocationUpdateInput = {
  /** The new street address of the location. */
  address?: InputMaybe<Scalars['String']['input']>;
  /** New attachments associated with the location. */
  attachments?: InputMaybe<CoreAttachmentCreateBelongsToMany>;
  /** New contacts associated with the location. */
  contacts?: InputMaybe<CoreContactCreateBelongsToMany>;
  /** The new description for the location. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Devices associated with the location. */
  devices?: InputMaybe<CoreDeviceCreateBelongsToMany>;
  /** Unique identifier of the location. */
  id: Scalars['ID']['input'];
  /** The new name of the location. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Networks associated with the location. */
  networks?: InputMaybe<CoreNetworkCreateBelongsToMany>;
  /** New notes associated with the location. */
  notes?: InputMaybe<CoreNoteCreateBelongsToMany>;
  /** The new ID of the parent location, if applicable. */
  parent_id?: InputMaybe<Scalars['ID']['input']>;
  /** The new type of the location, such as building, room, rack, or other. */
  type?: InputMaybe<CoreLocationTypes>;
};

/** Input for upserting a Core Location instance. */
export type CoreLocationUpsertInput = {
  /** The street address of the location. */
  address?: InputMaybe<Scalars['String']['input']>;
  /** Attachments associated with the location. */
  attachments?: InputMaybe<CoreAttachmentCreateBelongsToMany>;
  /** Contacts associated with the location. */
  contacts?: InputMaybe<CoreContactCreateBelongsToMany>;
  /** Optional description for the location. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Devices associated with the location. */
  devices?: InputMaybe<CoreDeviceCreateBelongsToMany>;
  /** Unique identifier of the location, if updating an existing location. */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** The name of the location. */
  name: Scalars['String']['input'];
  /** Networks associated with the location. */
  networks?: InputMaybe<CoreNetworkCreateBelongsToMany>;
  /** Notes associated with the location. */
  notes?: InputMaybe<CoreNoteCreateBelongsToMany>;
  /** The ID of the parent location, if applicable. */
  parent_id?: InputMaybe<Scalars['ID']['input']>;
  /** The type of the location, such as building, room, rack, or other. */
  type: CoreLocationTypes;
};

export type CoreMutations = {
  __typename?: 'CoreMutations';
  attachment: CoreAttachmentMutations;
  contact: CoreContactMutations;
  device: CoreDeviceMutations;
  location: CoreLocationMutations;
  network: CoreNetworkMutations;
  networks: CoreNetworksMutations;
  note: CoreNoteMutations;
};

/** Represents a network in Core Networks, including subnets and devices. */
export type CoreNetwork = {
  __typename?: 'CoreNetwork';
  /** The network addresses associated with the network. */
  addresses: Array<Maybe<CoreNetworksAddress>>;
  /** The attachments associated with the network. */
  attachments: Array<Maybe<CoreAttachment>>;
  /** The audit history for the location. */
  audits: Array<Maybe<Audit>>;
  /** The contacts associated with the network. */
  contacts: Array<Maybe<CoreContact>>;
  /** Timestamp when the network was created. */
  created_at: Scalars['DateTime']['output'];
  /** Optional description for the network. */
  description?: Maybe<Scalars['String']['output']>;
  /** The devices on the network. */
  devices: Array<Maybe<CoreDevice>>;
  /** Unique identifier for the network. */
  id: Scalars['ID']['output'];
  /** The locations associated with the network. */
  locations: Array<Maybe<CoreLocation>>;
  /** The subnet mask of the network. */
  mask?: Maybe<Scalars['String']['output']>;
  /** The name of the network. */
  name: Scalars['String']['output'];
  /** The IP address of the network. */
  network: Scalars['String']['output'];
  /** The notes associated with the network. */
  notes: Array<Maybe<CoreNote>>;
  /** The UUID of the parent network. */
  parent_id?: Maybe<Scalars['ID']['output']>;
  /** The parent network of this subnet. */
  parent_network?: Maybe<CoreNetwork>;
  /** The subnets that belong to this network. */
  subnets?: Maybe<Array<Maybe<CoreNetwork>>>;
  /** Timestamp when the network was last updated. */
  updated_at: Scalars['DateTime']['output'];
};

/** Input for connecting multiple networks. */
export type CoreNetworkCreateBelongsToMany = {
  connect?: InputMaybe<Array<Scalars['ID']['input']>>;
  create?: InputMaybe<Array<CoreNetworkCreateInput>>;
  sync?: InputMaybe<Array<Scalars['ID']['input']>>;
  upsert?: InputMaybe<Array<CoreNetworkUpsertInput>>;
};

/** Input for creating a new Core Network instance. */
export type CoreNetworkCreateInput = {
  /** Attachments associated with the network. */
  attachments?: InputMaybe<CoreAttachmentCreateBelongsToMany>;
  /** Contacts associated with the network. */
  contacts?: InputMaybe<CoreContactCreateBelongsToMany>;
  /** Optional description for the network. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Devices associated with the location. */
  devices?: InputMaybe<CoreDeviceCreateBelongsToMany>;
  /** Locations associated with the network. */
  locations?: InputMaybe<CoreLocationCreateBelongsToMany>;
  /** The name of the network. */
  name: Scalars['String']['input'];
  /** The IP address of the network. */
  network: Scalars['String']['input'];
  /** Notes associated with the network. */
  notes?: InputMaybe<CoreNoteCreateBelongsToMany>;
  /** The ID of the parent network, if applicable. */
  parent_id?: InputMaybe<Scalars['ID']['input']>;
};

/** Mutations for creating, updating, and deleting Core Networks. */
export type CoreNetworkMutations = {
  __typename?: 'CoreNetworkMutations';
  /** Create a new Core Network. */
  create: CoreNetwork;
  /** Delete a Core Network by ID. */
  delete?: Maybe<CoreNetwork>;
  /** Update an existing Core Network. */
  update: CoreNetwork;
};


/** Mutations for creating, updating, and deleting Core Networks. */
export type CoreNetworkMutationsCreateArgs = {
  input?: InputMaybe<CoreNetworkCreateInput>;
};


/** Mutations for creating, updating, and deleting Core Networks. */
export type CoreNetworkMutationsDeleteArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations for creating, updating, and deleting Core Networks. */
export type CoreNetworkMutationsUpdateArgs = {
  input?: InputMaybe<CoreNetworkUpdateInput>;
};

/** A paginated list of CoreNetwork items. */
export type CoreNetworkPaginator = {
  __typename?: 'CoreNetworkPaginator';
  /** A list of CoreNetwork items. */
  data: Array<CoreNetwork>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** Queries for retrieving Core Networks. */
export type CoreNetworkQueries = {
  __typename?: 'CoreNetworkQueries';
  /** List multiple networks. */
  list: CoreNetworkPaginator;
  /** Find a network by an identifying attribute. */
  single?: Maybe<CoreNetwork>;
};


/** Queries for retrieving Core Networks. */
export type CoreNetworkQueriesListArgs = {
  first?: Scalars['Int']['input'];
  includeIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  network?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
};


/** Queries for retrieving Core Networks. */
export type CoreNetworkQueriesSingleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Input for updating an existing Core Network instance. */
export type CoreNetworkUpdateInput = {
  /** New attachments associated with the network. */
  attachments?: InputMaybe<CoreAttachmentCreateBelongsToMany>;
  /** New contacts associated with the network. */
  contacts?: InputMaybe<CoreContactCreateBelongsToMany>;
  /** The new description for the network. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Devices associated with the location. */
  devices?: InputMaybe<CoreDeviceCreateBelongsToMany>;
  /** Unique identifier of the network. */
  id: Scalars['ID']['input'];
  /** New locations associated with the network. */
  locations?: InputMaybe<CoreLocationCreateBelongsToMany>;
  /** The new subnet mask of the network. */
  mask?: InputMaybe<Scalars['String']['input']>;
  /** The new name of the network. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The new IP address of the network. */
  network?: InputMaybe<Scalars['String']['input']>;
  /** New notes associated with the network. */
  notes?: InputMaybe<CoreNoteCreateBelongsToMany>;
  /** The new ID of the parent network, if applicable. */
  parent_id?: InputMaybe<Scalars['ID']['input']>;
};

/** Input for upserting a Core Network instance. */
export type CoreNetworkUpsertInput = {
  /** Attachments associated with the network. */
  attachments?: InputMaybe<CoreAttachmentCreateBelongsToMany>;
  /** Contacts associated with the network. */
  contacts?: InputMaybe<CoreContactCreateBelongsToMany>;
  /** Optional description for the network. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Devices associated with the location. */
  devices?: InputMaybe<CoreDeviceCreateBelongsToMany>;
  /** Unique identifier of the network, if updating an existing network. */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** Locations associated with the network. */
  locations?: InputMaybe<CoreLocationCreateBelongsToMany>;
  /** The subnet mask of the network. */
  mask?: InputMaybe<Scalars['String']['input']>;
  /** The name of the network. */
  name: Scalars['String']['input'];
  /** The IP address of the network. */
  network: Scalars['String']['input'];
  /** Notes associated with the network. */
  notes?: InputMaybe<CoreNoteCreateBelongsToMany>;
  /** The ID of the parent network, if applicable. */
  parent_id?: InputMaybe<Scalars['ID']['input']>;
};

/** Represents a network address in Core Networks. */
export type CoreNetworksAddress = {
  __typename?: 'CoreNetworksAddress';
  /** The address value. */
  address: Scalars['String']['output'];
  /** Timestamp when the network address was created. */
  created_at: Scalars['DateTime']['output'];
  /** Optional description for the network address. */
  description?: Maybe<Scalars['String']['output']>;
  /** The devices associated to this network address. */
  devices: Array<Maybe<CoreDevice>>;
  /** Unique primary key. */
  id: Scalars['ID']['output'];
  /** The network to which this address belongs. */
  network: CoreNetwork;
  /** The status of the network address, either online or offline. */
  status: CoreNetworksAddressStatus;
  /** Timestamp when the network address was last updated. */
  updated_at: Scalars['DateTime']['output'];
};

/** Input for connecting network addresses to multiple networks. */
export type CoreNetworksAddressCreateBelongsToMany = {
  /** IDs of the networks to connect the address to. */
  connect?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** IDs of the networks to synchronize with the address. */
  sync?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type CoreNetworksAddressMutations = {
  __typename?: 'CoreNetworksAddressMutations';
  update: CoreNetworksAddress;
};


export type CoreNetworksAddressMutationsUpdateArgs = {
  input?: InputMaybe<CoreNetworksAddressUpdateInput>;
};

/** A paginated list of CoreNetworksAddress items. */
export type CoreNetworksAddressPaginator = {
  __typename?: 'CoreNetworksAddressPaginator';
  /** A list of CoreNetworksAddress items. */
  data: Array<CoreNetworksAddress>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** Queries for retrieving Core Networks Addresses. */
export type CoreNetworksAddressQueries = {
  __typename?: 'CoreNetworksAddressQueries';
  /** List multiple network addresses. */
  list: CoreNetworksAddressPaginator;
  /** Find a network address by an identifying attribute. */
  single?: Maybe<CoreNetworksAddress>;
};


/** Queries for retrieving Core Networks Addresses. */
export type CoreNetworksAddressQueriesListArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  includeIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  network_id?: InputMaybe<Scalars['ID']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Queries for retrieving Core Networks Addresses. */
export type CoreNetworksAddressQueriesSingleArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

/** Status of a Core Networks Address, indicating whether it is online or offline. */
export enum CoreNetworksAddressStatus {
  OFFLINE = 'offline',
  ONLINE = 'online'
}

export type CoreNetworksAddressUpdateInput = {
  id: Scalars['ID']['input'];
  status: CoreNetworksAddressStatus;
};

export type CoreNetworksMutations = {
  __typename?: 'CoreNetworksMutations';
  address: CoreNetworksAddressMutations;
};

export type CoreNetworksQueries = {
  __typename?: 'CoreNetworksQueries';
  address: CoreNetworksAddressQueries;
};

/** Represents a note in Core, containing content and associated user information. */
export type CoreNote = {
  __typename?: 'CoreNote';
  /** The audit history for the location. */
  audits: Array<Maybe<Audit>>;
  /** The content of the note. */
  content: Scalars['String']['output'];
  /** Timestamp when the note was created. */
  created_at: Scalars['DateTime']['output'];
  /** Unique identifier for the note. */
  id: Scalars['ID']['output'];
  /** Timestamp when the note was last updated. */
  updated_at: Scalars['DateTime']['output'];
  /** The user associated with the note. */
  user?: Maybe<User>;
};

/** Input for connecting multiple notes. */
export type CoreNoteCreateBelongsToMany = {
  connect?: InputMaybe<Array<Scalars['ID']['input']>>;
  create?: InputMaybe<Array<CoreNoteCreateInput>>;
  sync?: InputMaybe<Array<Scalars['ID']['input']>>;
  upsert?: InputMaybe<Array<CoreNoteUpdateInput>>;
};

/** Input for creating a new Core Note instance. */
export type CoreNoteCreateInput = {
  /** The content of the note. */
  content: Scalars['String']['input'];
};

/** Mutations for creating, updating, and deleting Core Notes. */
export type CoreNoteMutations = {
  __typename?: 'CoreNoteMutations';
  /** Create a new Core Note. */
  create: CoreNote;
  /** Delete a Core Note by ID. */
  delete?: Maybe<CoreNote>;
  /** Update an existing Core Note. */
  update: CoreNote;
};


/** Mutations for creating, updating, and deleting Core Notes. */
export type CoreNoteMutationsCreateArgs = {
  input?: InputMaybe<CoreNoteCreateInput>;
};


/** Mutations for creating, updating, and deleting Core Notes. */
export type CoreNoteMutationsDeleteArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations for creating, updating, and deleting Core Notes. */
export type CoreNoteMutationsUpdateArgs = {
  input?: InputMaybe<CoreNoteUpdateInput>;
};

/** A paginated list of CoreNote items. */
export type CoreNotePaginator = {
  __typename?: 'CoreNotePaginator';
  /** A list of CoreNote items. */
  data: Array<CoreNote>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** Queries for retrieving Core Notes. */
export type CoreNoteQueries = {
  __typename?: 'CoreNoteQueries';
  /** List multiple notes. */
  list: CoreNotePaginator;
  /** Find a note by an identifying attribute. */
  single?: Maybe<CoreNote>;
};


/** Queries for retrieving Core Notes. */
export type CoreNoteQueriesListArgs = {
  first?: Scalars['Int']['input'];
  includeIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Queries for retrieving Core Notes. */
export type CoreNoteQueriesSingleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

/** Input for updating an existing Core Note instance. */
export type CoreNoteUpdateInput = {
  /** The new content of the note. */
  content?: InputMaybe<Scalars['String']['input']>;
  /** Unique identifier of the note. */
  id: Scalars['ID']['input'];
};

export type CoreQueries = {
  __typename?: 'CoreQueries';
  attachment: CoreAttachmentQueries;
  contact: CoreContactQueries;
  device: CoreDeviceQueries;
  location: CoreLocationQueries;
  network: CoreNetworkQueries;
  networks: CoreNetworksQueries;
  note: CoreNoteQueries;
};

export type CurrentUser = {
  __typename?: 'CurrentUser';
  /** Timestamp when the user account was created. */
  created_at: Scalars['DateTime']['output'];
  /** Unique email address of the user. */
  email: Scalars['String']['output'];
  /** Timestamp when the email was verified. */
  email_verified_at?: Maybe<Scalars['DateTime']['output']>;
  /** Unique primary key for the user. */
  id: Scalars['ID']['output'];
  /** List of invitations associated with the user. */
  invitations?: Maybe<Array<Invitation>>;
  /** Non-unique name of the user. */
  name: Scalars['String']['output'];
  /** Personal team of the user. */
  personal_team: Team;
  /** The URL of the user's profile photo. */
  photo?: Maybe<Scalars['String']['output']>;
  /** List of sent invitations by the user. */
  sent_invitations?: Maybe<Array<Invitation>>;
  /** List of teams associated with the user. */
  teams?: Maybe<Array<Team>>;
  /** Timestamp when the user account was last updated. */
  updated_at: Scalars['DateTime']['output'];
};

/** Input type for initiating the forgot password process. */
export type ForgotPasswordInput = {
  email: Scalars['String']['input'];
};

/** Response for initiating the forgot password process. */
export type ForgotPasswordResponse = {
  __typename?: 'ForgotPasswordResponse';
  message?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
};

/** Represents an invitation for a user to join a team. */
export type Invitation = {
  __typename?: 'Invitation';
  /** Flag indicating whether the invitation has been accepted. */
  accepted?: Maybe<Scalars['Boolean']['output']>;
  /** Email address associated with the invitation. */
  email: Scalars['String']['output'];
  /** Unique primary key for the invitation. */
  id: Scalars['ID']['output'];
  /** User who sent the invitation. */
  inviter: User;
  /** Team to which the user is invited. */
  team: Team;
  /** User associated with the invitation (if accepted). */
  user?: Maybe<User>;
};

/** Input for creating an invitation. */
export type InvitationCreateInput = {
  /** Email address for the invitation. */
  email: Scalars['Email']['input'];
};

/** Mutations for creating and updating invitations. */
export type InvitationMutations = {
  __typename?: 'InvitationMutations';
  /** Create a new invitation. */
  create: Invitation;
  /** Update an existing invitation. */
  update: Invitation;
};


/** Mutations for creating and updating invitations. */
export type InvitationMutationsCreateArgs = {
  input?: InputMaybe<InvitationCreateInput>;
};


/** Mutations for creating and updating invitations. */
export type InvitationMutationsUpdateArgs = {
  input?: InputMaybe<InvitationUpdateInput>;
};

/** Input for updating an invitation. */
export type InvitationUpdateInput = {
  /** Flag indicating whether the invitation has been accepted. */
  accepted: Scalars['Boolean']['input'];
  /** ID of the invitation to update. */
  id: Scalars['ID']['input'];
};

/** Input type for user login. */
export type LoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

/** Response for user logout. */
export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  message?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  agent: AgentMutations;
  agents: AgentsMutations;
  auth: AuthMutations;
  core: CoreMutations;
  invitation: InvitationMutations;
  team: TeamMutations;
  user: UserMutations;
};

/** Input type for updating the password with a reset token. */
export type NewPasswordWithCodeInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  password_confirmation: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  column: Scalars['String']['input'];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Aggregate functions when ordering by a relation without specifying a column. */
export enum OrderByRelationAggregateFunction {
  /** Amount of items. */
  COUNT = 'COUNT'
}

/** Aggregate functions when ordering by a relation that may specify a column. */
export enum OrderByRelationWithColumnAggregateFunction {
  /** Average. */
  AVG = 'AVG',
  /** Amount of items. */
  COUNT = 'COUNT',
  /** Maximum. */
  MAX = 'MAX',
  /** Minimum. */
  MIN = 'MIN',
  /** Sum. */
  SUM = 'SUM'
}

/** Information about pagination using a fully featured paginator. */
export type PaginatorInfo = {
  __typename?: 'PaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int']['output'];
  /** Index of the current page. */
  currentPage: Scalars['Int']['output'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']['output']>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars['Boolean']['output'];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']['output']>;
  /** Index of the last available page. */
  lastPage: Scalars['Int']['output'];
  /** Number of items per page. */
  perPage: Scalars['Int']['output'];
  /** Number of total available items. */
  total: Scalars['Int']['output'];
};

export type PluginsQueries = {
  __typename?: 'PluginsQueries';
  command: AgentsPluginsCommandQueries;
};

export type Query = {
  __typename?: 'Query';
  agent: AgentQueries;
  agents: AgentsQueries;
  audit: AuditQueries;
  core: CoreQueries;
  team: TeamQueries;
  user: UserQueries;
};

/** Input type for refreshing an access token. */
export type RefreshTokenInput = {
  refresh_token?: InputMaybe<Scalars['String']['input']>;
};

/** Payload returned upon refreshing an access token. */
export type RefreshTokenPayload = {
  __typename?: 'RefreshTokenPayload';
  access_token: Scalars['String']['output'];
  expires_in: Scalars['Int']['output'];
  refresh_token: Scalars['String']['output'];
  token_type: Scalars['String']['output'];
};

/** Input type for user registration. */
export type RegisterInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  password_confirmation: Scalars['String']['input'];
};

/** Response for user registration. */
export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  status: RegisterStatuses;
  tokens?: Maybe<AuthPayload>;
};

/** Enumeration for registration statuses. */
export enum RegisterStatuses {
  MUST_VERIFY_EMAIL = 'MUST_VERIFY_EMAIL',
  SUCCESS = 'SUCCESS'
}

/** Input type for social login. */
export type SocialLoginInput = {
  provider: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

/** Directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  ASC = 'ASC',
  /** Sort records in descending order. */
  DESC = 'DESC'
}

/** Represents a team in the system. */
export type Team = {
  __typename?: 'Team';
  /** List of agents associated with the team. */
  agents?: Maybe<Array<Maybe<Agent>>>;
  /** The audit history for the location. */
  audits: Array<Maybe<Audit>>;
  /** When the team was created. */
  created_at: Scalars['DateTime']['output'];
  /** Description of the team. */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique primary key for the team. */
  id: Scalars['ID']['output'];
  /** List of invitations associated with the team. */
  invitations?: Maybe<Array<Invitation>>;
  /** Non-unique name of the team. */
  name: Scalars['String']['output'];
  /** Flag indicating whether the team is personal. */
  personal: Scalars['Boolean']['output'];
  /** The URL of the team's profile photo. */
  photo?: Maybe<Scalars['String']['output']>;
  /** Pivot information for the team-user relationship. */
  pivot?: Maybe<TeamPivot>;
  /** List of plugins associated with the team. */
  plugins?: Maybe<Array<Maybe<AgentsPlugin>>>;
  /** When the team was last updated. */
  updated_at: Scalars['DateTime']['output'];
  /** List of users belonging to the team. */
  users: Array<User>;
};

/** Input for creating relationships between teams and users. */
export type TeamCreateBelongsToMany = {
  connect?: InputMaybe<Array<Scalars['ID']['input']>>;
  create?: InputMaybe<Array<TeamCreateInput>>;
  delete?: InputMaybe<Array<Scalars['ID']['input']>>;
  disconnect?: InputMaybe<Array<Scalars['ID']['input']>>;
  sync?: InputMaybe<Array<Scalars['ID']['input']>>;
  syncWithoutDetaching?: InputMaybe<Array<Scalars['ID']['input']>>;
  update?: InputMaybe<Array<TeamUpdateInput>>;
  upsert?: InputMaybe<Array<TeamUpsertInput>>;
};

/** Input for creating a team. */
export type TeamCreateInput = {
  /** Description of the team to create. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Profile photo of the team to create. */
  file?: InputMaybe<VaporFileUpload>;
  /** Name of the team to create. */
  name: Scalars['String']['input'];
};

/** Mutations for updating teams. */
export type TeamMutations = {
  __typename?: 'TeamMutations';
  /** Create a new team. */
  create?: Maybe<Team>;
  /** Update an existing team. */
  update?: Maybe<Team>;
};


/** Mutations for updating teams. */
export type TeamMutationsCreateArgs = {
  input?: InputMaybe<TeamCreateInput>;
};


/** Mutations for updating teams. */
export type TeamMutationsUpdateArgs = {
  input?: InputMaybe<TeamUpdateInput>;
};

/** Pivot information for the team-user relationship. */
export type TeamPivot = {
  __typename?: 'TeamPivot';
  /** Role of the user within the team. */
  role?: Maybe<Scalars['String']['output']>;
};

/** Queries for retrieving teams. */
export type TeamQueries = {
  __typename?: 'TeamQueries';
  /** Find a single team by an identifying attribute. */
  single?: Maybe<Team>;
};


/** Queries for retrieving teams. */
export type TeamQueriesSingleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

/** Input for updating a team. */
export type TeamUpdateInput = {
  /** Updated description of the team. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Updated profile photo of the team. */
  file?: InputMaybe<VaporFileUpload>;
  /** ID of the team to update. */
  id: Scalars['ID']['input'];
  /** Updated name of the team. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Users to associate with the team. */
  users?: InputMaybe<UserCreateBelongsToMany>;
};

/** Input for upserting a team. */
export type TeamUpsertInput = {
  /** Updated description of the team. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Updated profile photo of the team. */
  file?: InputMaybe<VaporFileUpload>;
  /** ID of the team to upsert. */
  id: Scalars['ID']['input'];
  /** Updated name of the team. */
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  ONLY = 'ONLY',
  /** Return both trashed and non-trashed results. */
  WITH = 'WITH',
  /** Only return non-trashed results. */
  WITHOUT = 'WITHOUT'
}

/** Input type for updating the user's password. */
export type UpdatePassword = {
  old_password: Scalars['String']['input'];
  password: Scalars['String']['input'];
  password_confirmation: Scalars['String']['input'];
};

/** Response for updating the user's password. */
export type UpdatePasswordResponse = {
  __typename?: 'UpdatePasswordResponse';
  message?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
};

/** Account of a person who utilizes this application. */
export type User = {
  __typename?: 'User';
  /** Timestamp when the user account was created. */
  created_at: Scalars['DateTime']['output'];
  /** Unique email address of the user. */
  email: Scalars['String']['output'];
  /** Unique primary key for the user. */
  id: Scalars['ID']['output'];
  /** Non-unique name of the user. */
  name: Scalars['String']['output'];
  /** The URL of the user's profile photo. */
  photo?: Maybe<Scalars['String']['output']>;
  /** Pivot information for the user-team relationship. */
  pivot?: Maybe<TeamPivot>;
  /** Timestamp when the user account was last updated. */
  updated_at: Scalars['DateTime']['output'];
};

/** Input for creating relationships between users and teams. */
export type UserCreateBelongsToMany = {
  disconnect?: InputMaybe<Array<Scalars['ID']['input']>>;
};

/** Mutations for updating users. */
export type UserMutations = {
  __typename?: 'UserMutations';
  /** Update an existing user. */
  update: User;
};


/** Mutations for updating users. */
export type UserMutationsUpdateArgs = {
  input?: InputMaybe<UserUpdateInput>;
};

/** A paginated list of User items. */
export type UserPaginator = {
  __typename?: 'UserPaginator';
  /** A list of User items. */
  data: Array<User>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** Queries for retrieving users. */
export type UserQueries = {
  __typename?: 'UserQueries';
  /** List multiple users with the ability to filter by name. */
  list: UserPaginator;
  /** Get the currently logged-in user. */
  me: CurrentUser;
  /** Get a single user by ID or email. */
  single?: Maybe<User>;
};


/** Queries for retrieving users. */
export type UserQueriesListArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Queries for retrieving users. */
export type UserQueriesSingleArgs = {
  email?: InputMaybe<Scalars['Email']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

/** Input for updating a user. */
export type UserUpdateInput = {
  /** Updated profile photo of the user. */
  file?: InputMaybe<VaporFileUpload>;
  /** ID of the user to update. */
  id: Scalars['ID']['input'];
  /** Updated name of the user. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Teams to associate with the user. */
  teams?: InputMaybe<TeamCreateBelongsToMany>;
};

export type VaporFileUpload = {
  bucket: Scalars['String']['input'];
  content_type: Scalars['String']['input'];
  key: Scalars['String']['input'];
  name: Scalars['String']['input'];
  upload_uuid: Scalars['String']['input'];
};

/** Input type for verifying the user's email address. */
export type VerifyEmailInput = {
  token: Scalars['String']['input'];
};

export type CoreContactCreateMutationVariables = Exact<{
  input: CoreContactCreateInput;
}>;


export type CoreContactCreateMutation = { __typename?: 'Mutation', core: { __typename?: 'CoreMutations', contact: { __typename?: 'CoreContactMutations', create: { __typename?: 'CoreContact', id: string } } } };

export type CoreContactSelectFilteredSingleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CoreContactSelectFilteredSingleQuery = { __typename?: 'Query', core: { __typename?: 'CoreQueries', contact: { __typename?: 'CoreContactQueries', single?: { __typename?: 'CoreContact', id: string, name: string } | null } } };

export type CoreContactSelectFilteredListQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<CoreContactTypes>;
}>;


export type CoreContactSelectFilteredListQuery = { __typename?: 'Query', core: { __typename?: 'CoreQueries', contact: { __typename?: 'CoreContactQueries', list: { __typename?: 'CoreContactPaginator', data: Array<{ __typename?: 'CoreContact', id: string, name: string }> } } } };

export type CoreDeviceCreateMutationVariables = Exact<{
  input: CoreDeviceCreateInput;
}>;


export type CoreDeviceCreateMutation = { __typename?: 'Mutation', core: { __typename?: 'CoreMutations', device: { __typename?: 'CoreDeviceMutations', create: { __typename?: 'CoreDevice', id: string } } } };

export type CoreDeviceSelectFilteredListQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type CoreDeviceSelectFilteredListQuery = { __typename?: 'Query', core: { __typename?: 'CoreQueries', device: { __typename?: 'CoreDeviceQueries', list: { __typename?: 'CoreDevicePaginator', data: Array<{ __typename?: 'CoreDevice', id: string, name: string }> } } } };

export type CoreLocationCreateMutationVariables = Exact<{
  input?: InputMaybe<CoreLocationCreateInput>;
}>;


export type CoreLocationCreateMutation = { __typename?: 'Mutation', core: { __typename?: 'CoreMutations', location: { __typename?: 'CoreLocationMutations', create: { __typename?: 'CoreLocation', id: string } } } };

export type CoreLocationSelectFilteredSingleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CoreLocationSelectFilteredSingleQuery = { __typename?: 'Query', core: { __typename?: 'CoreQueries', location: { __typename?: 'CoreLocationQueries', single?: { __typename?: 'CoreLocation', id: string, name: string } | null } } };

export type CoreLocationSelectFilteredListQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type CoreLocationSelectFilteredListQuery = { __typename?: 'Query', core: { __typename?: 'CoreQueries', location: { __typename?: 'CoreLocationQueries', list: { __typename?: 'CoreLocationPaginator', data: Array<{ __typename?: 'CoreLocation', id: string, name: string }> } } } };

export type CoreNetworkCreateMutationVariables = Exact<{
  input?: InputMaybe<CoreNetworkCreateInput>;
}>;


export type CoreNetworkCreateMutation = { __typename?: 'Mutation', core: { __typename?: 'CoreMutations', network: { __typename?: 'CoreNetworkMutations', create: { __typename?: 'CoreNetwork', id: string } } } };

export type CoreNetworkSelectFilteredSingleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CoreNetworkSelectFilteredSingleQuery = { __typename?: 'Query', core: { __typename?: 'CoreQueries', network: { __typename?: 'CoreNetworkQueries', single?: { __typename?: 'CoreNetwork', id: string, name: string } | null } } };

export type CoreNetworkSelectFilteredListQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type CoreNetworkSelectFilteredListQuery = { __typename?: 'Query', core: { __typename?: 'CoreQueries', network: { __typename?: 'CoreNetworkQueries', list: { __typename?: 'CoreNetworkPaginator', data: Array<{ __typename?: 'CoreNetwork', id: string, name: string }> } } } };

export type InvitationCreateMutationVariables = Exact<{
  input?: InputMaybe<InvitationCreateInput>;
}>;


export type InvitationCreateMutation = { __typename?: 'Mutation', invitation: { __typename?: 'InvitationMutations', create: { __typename?: 'Invitation', id: string } } };

export type TeamCreateMutationVariables = Exact<{
  input?: InputMaybe<TeamCreateInput>;
}>;


export type TeamCreateMutation = { __typename?: 'Mutation', team: { __typename?: 'TeamMutations', create?: { __typename?: 'Team', id: string } | null } };

export type EditProfileMutationVariables = Exact<{
  input?: InputMaybe<UserUpdateInput>;
}>;


export type EditProfileMutation = { __typename?: 'Mutation', user: { __typename?: 'UserMutations', update: { __typename?: 'User', id: string } } };

export type UserSelectFilteredListQueryVariables = Exact<{
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type UserSelectFilteredListQuery = { __typename?: 'Query', user: { __typename?: 'UserQueries', list: { __typename?: 'UserPaginator', data: Array<{ __typename?: 'User', id: string, email: string, name: string, photo?: string | null }> } } };

export type CoreContactListQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<CoreContactTypes>;
}>;


export type CoreContactListQuery = { __typename?: 'Query', core: { __typename?: 'CoreQueries', contact: { __typename?: 'CoreContactQueries', list: { __typename?: 'CoreContactPaginator', paginatorInfo: { __typename?: 'PaginatorInfo', count: number, currentPage: number, firstItem?: number | null, hasMorePages: boolean, lastItem?: number | null, lastPage: number, perPage: number, total: number }, data: Array<{ __typename?: 'CoreContact', company_id?: string | null, created_at: Date, description?: string | null, email?: string | null, id: string, name: string, phone?: string | null, photo?: string | null, type: CoreContactTypes, updated_at: Date, company?: { __typename?: 'CoreContact', id: string, name: string } | null }> } } } };

export type CoreContactDeleteMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CoreContactDeleteMutation = { __typename?: 'Mutation', core: { __typename?: 'CoreMutations', contact: { __typename?: 'CoreContactMutations', delete?: { __typename?: 'CoreContact', id: string } | null } } };

export type CoreContactSingleQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type CoreContactSingleQuery = { __typename?: 'Query', core: { __typename?: 'CoreQueries', contact: { __typename?: 'CoreContactQueries', single?: { __typename?: 'CoreContact', id: string, name: string, photo?: string | null, type: CoreContactTypes, phone?: string | null, email?: string | null, description?: string | null, company_id?: string | null, company?: { __typename?: 'CoreContact', id: string, name: string } | null, contacts?: Array<{ __typename?: 'CoreContact', id: string }> | null, notes: Array<{ __typename?: 'CoreNote', id: string } | null>, attachments: Array<{ __typename?: 'CoreAttachment', id: string } | null>, locations: Array<{ __typename?: 'CoreLocation', id: string } | null>, networks: Array<{ __typename?: 'CoreNetwork', id: string } | null>, devices: Array<{ __typename?: 'CoreDevice', id: string } | null>, audits: Array<{ __typename?: 'Audit', id: string } | null> } | null } } };

export type CoreContactUpdateMutationVariables = Exact<{
  input: CoreContactUpdateInput;
}>;


export type CoreContactUpdateMutation = { __typename?: 'Mutation', core: { __typename?: 'CoreMutations', contact: { __typename?: 'CoreContactMutations', update: { __typename?: 'CoreContact', id: string } } } };

export type CoreDeviceListQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  hostname?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<CoreDeviceTypes>;
}>;


export type CoreDeviceListQuery = { __typename?: 'Query', core: { __typename?: 'CoreQueries', device: { __typename?: 'CoreDeviceQueries', list: { __typename?: 'CoreDevicePaginator', paginatorInfo: { __typename?: 'PaginatorInfo', count: number, currentPage: number, firstItem?: number | null, hasMorePages: boolean, lastItem?: number | null, lastPage: number, perPage: number, total: number }, data: Array<{ __typename?: 'CoreDevice', created_at: Date, description?: string | null, hostname?: string | null, id: string, name: string, type: CoreDeviceTypes, updated_at: Date }> } } } };

export type CoreDeviceDeleteMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CoreDeviceDeleteMutation = { __typename?: 'Mutation', core: { __typename?: 'CoreMutations', device: { __typename?: 'CoreDeviceMutations', delete?: { __typename?: 'CoreDevice', id: string } | null } } };

export type CoreDeviceSingleQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type CoreDeviceSingleQuery = { __typename?: 'Query', core: { __typename?: 'CoreQueries', device: { __typename?: 'CoreDeviceQueries', single?: { __typename?: 'CoreDevice', id: string, name: string, hostname?: string | null, type: CoreDeviceTypes, description?: string | null, created_at: Date, updated_at: Date, contacts: Array<{ __typename?: 'CoreContact', id: string } | null>, attachments: Array<{ __typename?: 'CoreAttachment', id: string } | null>, notes: Array<{ __typename?: 'CoreNote', id: string } | null>, audits: Array<{ __typename?: 'Audit', id: string } | null>, addresses: Array<{ __typename?: 'CoreNetworksAddress', id: string } | null>, networks: Array<{ __typename?: 'CoreNetwork', id: string } | null>, locations: Array<{ __typename?: 'CoreLocation', id: string } | null> } | null } } };

export type CoreDeviceUpdateMutationVariables = Exact<{
  input: CoreDeviceUpdateInput;
}>;


export type CoreDeviceUpdateMutation = { __typename?: 'Mutation', core: { __typename?: 'CoreMutations', device: { __typename?: 'CoreDeviceMutations', update: { __typename?: 'CoreDevice', id: string } } } };

export type CoreLocationListQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<CoreLocationTypes>;
}>;


export type CoreLocationListQuery = { __typename?: 'Query', core: { __typename?: 'CoreQueries', location: { __typename?: 'CoreLocationQueries', list: { __typename?: 'CoreLocationPaginator', data: Array<{ __typename?: 'CoreLocation', id: string, name: string, parent_id?: string | null, type: CoreLocationTypes, description?: string | null, created_at: Date, address?: string | null, parent_location?: { __typename?: 'CoreLocation', id: string, name: string } | null }>, paginatorInfo: { __typename?: 'PaginatorInfo', firstItem?: number | null, lastItem?: number | null, count: number, currentPage: number, hasMorePages: boolean, lastPage: number, perPage: number, total: number } } } } };

export type CoreLocationDeleteMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CoreLocationDeleteMutation = { __typename?: 'Mutation', core: { __typename?: 'CoreMutations', location: { __typename?: 'CoreLocationMutations', delete?: { __typename?: 'CoreLocation', id: string } | null } } };

export type CoreLocationSingleQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type CoreLocationSingleQuery = { __typename?: 'Query', core: { __typename?: 'CoreQueries', location: { __typename?: 'CoreLocationQueries', single?: { __typename?: 'CoreLocation', id: string, name: string, type: CoreLocationTypes, description?: string | null, address?: string | null, parent_id?: string | null, created_at: Date, updated_at: Date, parent_location?: { __typename?: 'CoreLocation', id: string, name: string, type: CoreLocationTypes } | null, contacts: Array<{ __typename?: 'CoreContact', id: string } | null>, notes: Array<{ __typename?: 'CoreNote', id: string } | null>, attachments: Array<{ __typename?: 'CoreAttachment', id: string } | null>, networks: Array<{ __typename?: 'CoreNetwork', id: string } | null>, devices: Array<{ __typename?: 'CoreDevice', id: string } | null>, audits: Array<{ __typename?: 'Audit', id: string } | null> } | null } } };

export type CoreLocationUpdateMutationVariables = Exact<{
  input: CoreLocationUpdateInput;
}>;


export type CoreLocationUpdateMutation = { __typename?: 'Mutation', core: { __typename?: 'CoreMutations', location: { __typename?: 'CoreLocationMutations', update?: { __typename?: 'CoreLocation', id: string } | null } } };

export type CoreNetworkListQueryVariables = Exact<{
  perPage?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  network?: InputMaybe<Scalars['String']['input']>;
}>;


export type CoreNetworkListQuery = { __typename?: 'Query', core: { __typename?: 'CoreQueries', network: { __typename?: 'CoreNetworkQueries', list: { __typename?: 'CoreNetworkPaginator', data: Array<{ __typename?: 'CoreNetwork', id: string, name: string, parent_id?: string | null, description?: string | null, created_at: Date, network: string, mask?: string | null, updated_at: Date, parent_network?: { __typename?: 'CoreNetwork', id: string, name: string } | null }>, paginatorInfo: { __typename?: 'PaginatorInfo', firstItem?: number | null, lastItem?: number | null, count: number, currentPage: number, hasMorePages: boolean, lastPage: number, perPage: number, total: number } } } } };

export type CoreNetworkDeleteMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CoreNetworkDeleteMutation = { __typename?: 'Mutation', core: { __typename?: 'CoreMutations', network: { __typename?: 'CoreNetworkMutations', delete?: { __typename?: 'CoreNetwork', id: string } | null } } };

export type CoreNetworkSingleQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type CoreNetworkSingleQuery = { __typename?: 'Query', core: { __typename?: 'CoreQueries', network: { __typename?: 'CoreNetworkQueries', single?: { __typename?: 'CoreNetwork', id: string, name: string, description?: string | null, network: string, mask?: string | null, parent_id?: string | null, created_at: Date, updated_at: Date, parent_network?: { __typename?: 'CoreNetwork', id: string, name: string, network: string } | null, subnets?: Array<{ __typename?: 'CoreNetwork', id: string, name: string, network: string } | null> | null, contacts: Array<{ __typename?: 'CoreContact', id: string } | null>, notes: Array<{ __typename?: 'CoreNote', id: string } | null>, attachments: Array<{ __typename?: 'CoreAttachment', id: string } | null>, locations: Array<{ __typename?: 'CoreLocation', id: string } | null>, devices: Array<{ __typename?: 'CoreDevice', id: string } | null>, audits: Array<{ __typename?: 'Audit', id: string } | null> } | null } } };

export type CoreNetworkUpdateMutationVariables = Exact<{
  input: CoreNetworkUpdateInput;
}>;


export type CoreNetworkUpdateMutation = { __typename?: 'Mutation', core: { __typename?: 'CoreMutations', network: { __typename?: 'CoreNetworkMutations', update: { __typename?: 'CoreNetwork', id: string } } } };

export type InvitationListQueryVariables = Exact<{ [key: string]: never; }>;


export type InvitationListQuery = { __typename?: 'Query', user: { __typename?: 'UserQueries', me: { __typename?: 'CurrentUser', invitations?: Array<{ __typename?: 'Invitation', id: string, inviter: { __typename?: 'User', id: string, email: string, name: string, photo?: string | null }, team: { __typename?: 'Team', id: string, name: string, photo?: string | null, personal: boolean, description?: string | null } }> | null } } };

export type TeamViewCurrentQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type TeamViewCurrentQuery = { __typename?: 'Query', team: { __typename?: 'TeamQueries', single?: { __typename?: 'Team', id: string, name: string, personal: boolean, description?: string | null, photo?: string | null, updated_at: Date, created_at: Date, agents?: Array<{ __typename?: 'Agent', id: string, name: string } | null> | null, invitations?: Array<{ __typename?: 'Invitation', id: string, accepted?: boolean | null, email: string, inviter: { __typename?: 'User', id: string, name: string, photo?: string | null }, user?: { __typename?: 'User', id: string, name: string, photo?: string | null } | null }> | null, users: Array<{ __typename?: 'User', id: string, name: string, photo?: string | null, pivot?: { __typename?: 'TeamPivot', role?: string | null } | null }> } | null } };

export type ForgotPasswordMutationVariables = Exact<{
  input: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', auth: { __typename?: 'AuthMutations', forgotPassword: { __typename?: 'ForgotPasswordResponse', status: string, message?: string | null } } };

export type LoginMutationVariables = Exact<{
  input?: InputMaybe<LoginInput>;
}>;


export type LoginMutation = { __typename?: 'Mutation', auth: { __typename?: 'AuthMutations', login: { __typename?: 'AuthPayload', access_token?: string | null, refresh_token?: string | null, expires_in?: number | null, token_type?: string | null, user?: { __typename?: 'CurrentUser', id: string, email: string, name: string, photo?: string | null, created_at: Date, updated_at: Date, personal_team: { __typename?: 'Team', id: string, name: string, photo?: string | null }, teams?: Array<{ __typename?: 'Team', id: string, name: string, photo?: string | null }> | null, invitations?: Array<{ __typename?: 'Invitation', id: string }> | null } | null } } };

export type RefreshTokenMutationVariables = Exact<{
  input?: InputMaybe<RefreshTokenInput>;
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', auth: { __typename?: 'AuthMutations', refreshToken: { __typename?: 'RefreshTokenPayload', access_token: string, expires_in: number, refresh_token: string, token_type: string } } };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', auth: { __typename?: 'AuthMutations', register: { __typename?: 'RegisterResponse', status: RegisterStatuses, tokens?: { __typename?: 'AuthPayload', access_token?: string | null, refresh_token?: string | null, expires_in?: number | null, token_type?: string | null, user?: { __typename?: 'CurrentUser', id: string, name: string, photo?: string | null, email: string, email_verified_at?: Date | null, personal_team: { __typename?: 'Team', id: string, name: string, photo?: string | null }, teams?: Array<{ __typename?: 'Team', id: string, name: string, photo?: string | null }> | null, invitations?: Array<{ __typename?: 'Invitation', id: string }> | null } | null } | null } } };

export type UpdateForgottenPasswordMutationVariables = Exact<{
  input: NewPasswordWithCodeInput;
}>;


export type UpdateForgottenPasswordMutation = { __typename?: 'Mutation', auth: { __typename?: 'AuthMutations', updateForgottenPassword: { __typename?: 'ForgotPasswordResponse', status: string, message?: string | null } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', auth: { __typename?: 'AuthMutations', logout: { __typename?: 'LogoutResponse', status: string, message?: string | null } } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', user: { __typename?: 'UserQueries', me: { __typename?: 'CurrentUser', id: string, email: string, name: string, photo?: string | null, created_at: Date, updated_at: Date, personal_team: { __typename?: 'Team', id: string, name: string, photo?: string | null }, teams?: Array<{ __typename?: 'Team', id: string, name: string, photo?: string | null }> | null, invitations?: Array<{ __typename?: 'Invitation', id: string }> | null } } };

export type WidgetAuditListQueryVariables = Exact<{
  includeIds?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type WidgetAuditListQuery = { __typename?: 'Query', audit: { __typename?: 'AuditQueries', list: { __typename?: 'AuditPaginator', data: Array<{ __typename?: 'Audit', auditable_id: string, auditable_type: string, created_at: Date, event: string, id: string, ip_address: string, new_values: { [key: string]: any }, old_values: { [key: string]: any }, tags?: string | null, url?: string | null, user_agent: string, user: { __typename?: 'Agent', id: string, name: string } | { __typename?: 'User', id: string, name: string, photo?: string | null } }>, paginatorInfo: { __typename?: 'PaginatorInfo', count: number, currentPage: number, firstItem?: number | null, hasMorePages: boolean, lastItem?: number | null, lastPage: number, perPage: number, total: number } } } };

export type WidgetCoreAttachmentListQueryVariables = Exact<{
  includeIds?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type WidgetCoreAttachmentListQuery = { __typename?: 'Query', core: { __typename?: 'CoreQueries', attachment: { __typename?: 'CoreAttachmentQueries', list: { __typename?: 'CoreAttachmentPaginator', data: Array<{ __typename?: 'CoreAttachment', content_type?: string | null, created_at: Date, id: string, link: string, name: string, size: number, updated_at: Date }>, paginatorInfo: { __typename?: 'PaginatorInfo', count: number, currentPage: number, firstItem?: number | null, hasMorePages: boolean, lastItem?: number | null, lastPage: number, perPage: number, total: number } } } } };

export type WidgetCoreContactListQueryVariables = Exact<{
  includeIds?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type WidgetCoreContactListQuery = { __typename?: 'Query', core: { __typename?: 'CoreQueries', contact: { __typename?: 'CoreContactQueries', list: { __typename?: 'CoreContactPaginator', data: Array<{ __typename?: 'CoreContact', description?: string | null, email?: string | null, name: string, id: string, phone?: string | null, photo?: string | null, company?: { __typename?: 'CoreContact', name: string, id: string } | null }>, paginatorInfo: { __typename?: 'PaginatorInfo', count: number, currentPage: number, firstItem?: number | null, hasMorePages: boolean, lastItem?: number | null, lastPage: number, perPage: number, total: number } } } } };

export type WidgetCoreDeviceListQueryVariables = Exact<{
  includeIds?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type WidgetCoreDeviceListQuery = { __typename?: 'Query', core: { __typename?: 'CoreQueries', device: { __typename?: 'CoreDeviceQueries', list: { __typename?: 'CoreDevicePaginator', data: Array<{ __typename?: 'CoreDevice', id: string, name: string, hostname?: string | null, description?: string | null, type: CoreDeviceTypes }>, paginatorInfo: { __typename?: 'PaginatorInfo', count: number, currentPage: number, firstItem?: number | null, hasMorePages: boolean, lastItem?: number | null, lastPage: number, perPage: number, total: number } } } } };

export type WidgetCoreLocationListQueryVariables = Exact<{
  includeIds?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type WidgetCoreLocationListQuery = { __typename?: 'Query', core: { __typename?: 'CoreQueries', location: { __typename?: 'CoreLocationQueries', list: { __typename?: 'CoreLocationPaginator', data: Array<{ __typename?: 'CoreLocation', id: string, name: string, type: CoreLocationTypes, description?: string | null, address?: string | null, created_at: Date, updated_at: Date }>, paginatorInfo: { __typename?: 'PaginatorInfo', count: number, currentPage: number, firstItem?: number | null, hasMorePages: boolean, lastItem?: number | null, lastPage: number, perPage: number, total: number } } } } };

export type WidgetCoreLocationTreeQueryVariables = Exact<{
  parentId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type WidgetCoreLocationTreeQuery = { __typename?: 'Query', core: { __typename?: 'CoreQueries', location: { __typename?: 'CoreLocationQueries', list: { __typename?: 'CoreLocationPaginator', data: Array<{ __typename?: 'CoreLocation', id: string, name: string, type: CoreLocationTypes }> } } } };

export type WidgetCoreNetworkListQueryVariables = Exact<{
  includeIds?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type WidgetCoreNetworkListQuery = { __typename?: 'Query', core: { __typename?: 'CoreQueries', network: { __typename?: 'CoreNetworkQueries', list: { __typename?: 'CoreNetworkPaginator', data: Array<{ __typename?: 'CoreNetwork', id: string, name: string, description?: string | null, network: string, mask?: string | null, parent_id?: string | null, created_at: Date, updated_at: Date, parent_network?: { __typename?: 'CoreNetwork', id: string, name: string, network: string } | null, subnets?: Array<{ __typename?: 'CoreNetwork', id: string } | null> | null }>, paginatorInfo: { __typename?: 'PaginatorInfo', count: number, currentPage: number, firstItem?: number | null, hasMorePages: boolean, lastItem?: number | null, lastPage: number, perPage: number, total: number } } } } };

export type WidgetCoreNoteListQueryVariables = Exact<{
  includeIds?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type WidgetCoreNoteListQuery = { __typename?: 'Query', core: { __typename?: 'CoreQueries', note: { __typename?: 'CoreNoteQueries', list: { __typename?: 'CoreNotePaginator', data: Array<{ __typename?: 'CoreNote', content: string, created_at: Date, id: string, updated_at: Date, user?: { __typename?: 'User', id: string, name: string, photo?: string | null, pivot?: { __typename?: 'TeamPivot', role?: string | null } | null } | null }>, paginatorInfo: { __typename?: 'PaginatorInfo', count: number, currentPage: number, firstItem?: number | null, hasMorePages: boolean, lastItem?: number | null, lastPage: number, perPage: number, total: number } } } } };


export const CoreContactCreateDocument = gql`
    mutation coreContactCreate($input: CoreContactCreateInput!) {
  core {
    contact {
      create(input: $input) {
        id
      }
    }
  }
}
    `;

/**
 * __useCoreContactCreateMutation__
 *
 * To run a mutation, you first call `useCoreContactCreateMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCoreContactCreateMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCoreContactCreateMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCoreContactCreateMutation(options: VueApolloComposable.UseMutationOptions<CoreContactCreateMutation, CoreContactCreateMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CoreContactCreateMutation, CoreContactCreateMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CoreContactCreateMutation, CoreContactCreateMutationVariables>(CoreContactCreateDocument, options);
}
export type CoreContactCreateMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CoreContactCreateMutation, CoreContactCreateMutationVariables>;
export const CoreContactSelectFilteredSingleDocument = gql`
    query coreContactSelectFilteredSingle($id: ID!) {
  core {
    contact {
      single(id: $id) {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useCoreContactSelectFilteredSingleQuery__
 *
 * To run a query within a Vue component, call `useCoreContactSelectFilteredSingleQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoreContactSelectFilteredSingleQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useCoreContactSelectFilteredSingleQuery({
 *   id: // value for 'id'
 * });
 */
export function useCoreContactSelectFilteredSingleQuery(variables: CoreContactSelectFilteredSingleQueryVariables | VueCompositionApi.Ref<CoreContactSelectFilteredSingleQueryVariables> | ReactiveFunction<CoreContactSelectFilteredSingleQueryVariables>, options: VueApolloComposable.UseQueryOptions<CoreContactSelectFilteredSingleQuery, CoreContactSelectFilteredSingleQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CoreContactSelectFilteredSingleQuery, CoreContactSelectFilteredSingleQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CoreContactSelectFilteredSingleQuery, CoreContactSelectFilteredSingleQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<CoreContactSelectFilteredSingleQuery, CoreContactSelectFilteredSingleQueryVariables>(CoreContactSelectFilteredSingleDocument, variables, options);
}
export function useCoreContactSelectFilteredSingleLazyQuery(variables: CoreContactSelectFilteredSingleQueryVariables | VueCompositionApi.Ref<CoreContactSelectFilteredSingleQueryVariables> | ReactiveFunction<CoreContactSelectFilteredSingleQueryVariables>, options: VueApolloComposable.UseQueryOptions<CoreContactSelectFilteredSingleQuery, CoreContactSelectFilteredSingleQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CoreContactSelectFilteredSingleQuery, CoreContactSelectFilteredSingleQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CoreContactSelectFilteredSingleQuery, CoreContactSelectFilteredSingleQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<CoreContactSelectFilteredSingleQuery, CoreContactSelectFilteredSingleQueryVariables>(CoreContactSelectFilteredSingleDocument, variables, options);
}
export type CoreContactSelectFilteredSingleQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<CoreContactSelectFilteredSingleQuery, CoreContactSelectFilteredSingleQueryVariables>;
export const CoreContactSelectFilteredListDocument = gql`
    query coreContactSelectFilteredList($name: String, $type: CoreContactTypes) {
  core {
    contact {
      list(name: $name, type: $type) {
        data {
          id
          name
        }
      }
    }
  }
}
    `;

/**
 * __useCoreContactSelectFilteredListQuery__
 *
 * To run a query within a Vue component, call `useCoreContactSelectFilteredListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoreContactSelectFilteredListQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useCoreContactSelectFilteredListQuery({
 *   name: // value for 'name'
 *   type: // value for 'type'
 * });
 */
export function useCoreContactSelectFilteredListQuery(variables: CoreContactSelectFilteredListQueryVariables | VueCompositionApi.Ref<CoreContactSelectFilteredListQueryVariables> | ReactiveFunction<CoreContactSelectFilteredListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<CoreContactSelectFilteredListQuery, CoreContactSelectFilteredListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CoreContactSelectFilteredListQuery, CoreContactSelectFilteredListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CoreContactSelectFilteredListQuery, CoreContactSelectFilteredListQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<CoreContactSelectFilteredListQuery, CoreContactSelectFilteredListQueryVariables>(CoreContactSelectFilteredListDocument, variables, options);
}
export function useCoreContactSelectFilteredListLazyQuery(variables: CoreContactSelectFilteredListQueryVariables | VueCompositionApi.Ref<CoreContactSelectFilteredListQueryVariables> | ReactiveFunction<CoreContactSelectFilteredListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<CoreContactSelectFilteredListQuery, CoreContactSelectFilteredListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CoreContactSelectFilteredListQuery, CoreContactSelectFilteredListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CoreContactSelectFilteredListQuery, CoreContactSelectFilteredListQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<CoreContactSelectFilteredListQuery, CoreContactSelectFilteredListQueryVariables>(CoreContactSelectFilteredListDocument, variables, options);
}
export type CoreContactSelectFilteredListQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<CoreContactSelectFilteredListQuery, CoreContactSelectFilteredListQueryVariables>;
export const CoreDeviceCreateDocument = gql`
    mutation coreDeviceCreate($input: CoreDeviceCreateInput!) {
  core {
    device {
      create(input: $input) {
        id
      }
    }
  }
}
    `;

/**
 * __useCoreDeviceCreateMutation__
 *
 * To run a mutation, you first call `useCoreDeviceCreateMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCoreDeviceCreateMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCoreDeviceCreateMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCoreDeviceCreateMutation(options: VueApolloComposable.UseMutationOptions<CoreDeviceCreateMutation, CoreDeviceCreateMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CoreDeviceCreateMutation, CoreDeviceCreateMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CoreDeviceCreateMutation, CoreDeviceCreateMutationVariables>(CoreDeviceCreateDocument, options);
}
export type CoreDeviceCreateMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CoreDeviceCreateMutation, CoreDeviceCreateMutationVariables>;
export const CoreDeviceSelectFilteredListDocument = gql`
    query coreDeviceSelectFilteredList($name: String) {
  core {
    device {
      list(name: $name) {
        data {
          id
          name
        }
      }
    }
  }
}
    `;

/**
 * __useCoreDeviceSelectFilteredListQuery__
 *
 * To run a query within a Vue component, call `useCoreDeviceSelectFilteredListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoreDeviceSelectFilteredListQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useCoreDeviceSelectFilteredListQuery({
 *   name: // value for 'name'
 * });
 */
export function useCoreDeviceSelectFilteredListQuery(variables: CoreDeviceSelectFilteredListQueryVariables | VueCompositionApi.Ref<CoreDeviceSelectFilteredListQueryVariables> | ReactiveFunction<CoreDeviceSelectFilteredListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<CoreDeviceSelectFilteredListQuery, CoreDeviceSelectFilteredListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CoreDeviceSelectFilteredListQuery, CoreDeviceSelectFilteredListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CoreDeviceSelectFilteredListQuery, CoreDeviceSelectFilteredListQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<CoreDeviceSelectFilteredListQuery, CoreDeviceSelectFilteredListQueryVariables>(CoreDeviceSelectFilteredListDocument, variables, options);
}
export function useCoreDeviceSelectFilteredListLazyQuery(variables: CoreDeviceSelectFilteredListQueryVariables | VueCompositionApi.Ref<CoreDeviceSelectFilteredListQueryVariables> | ReactiveFunction<CoreDeviceSelectFilteredListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<CoreDeviceSelectFilteredListQuery, CoreDeviceSelectFilteredListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CoreDeviceSelectFilteredListQuery, CoreDeviceSelectFilteredListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CoreDeviceSelectFilteredListQuery, CoreDeviceSelectFilteredListQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<CoreDeviceSelectFilteredListQuery, CoreDeviceSelectFilteredListQueryVariables>(CoreDeviceSelectFilteredListDocument, variables, options);
}
export type CoreDeviceSelectFilteredListQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<CoreDeviceSelectFilteredListQuery, CoreDeviceSelectFilteredListQueryVariables>;
export const CoreLocationCreateDocument = gql`
    mutation coreLocationCreate($input: CoreLocationCreateInput) {
  core {
    location {
      create(input: $input) {
        id
      }
    }
  }
}
    `;

/**
 * __useCoreLocationCreateMutation__
 *
 * To run a mutation, you first call `useCoreLocationCreateMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCoreLocationCreateMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCoreLocationCreateMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCoreLocationCreateMutation(options: VueApolloComposable.UseMutationOptions<CoreLocationCreateMutation, CoreLocationCreateMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CoreLocationCreateMutation, CoreLocationCreateMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CoreLocationCreateMutation, CoreLocationCreateMutationVariables>(CoreLocationCreateDocument, options);
}
export type CoreLocationCreateMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CoreLocationCreateMutation, CoreLocationCreateMutationVariables>;
export const CoreLocationSelectFilteredSingleDocument = gql`
    query coreLocationSelectFilteredSingle($id: ID!) {
  core {
    location {
      single(id: $id) {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useCoreLocationSelectFilteredSingleQuery__
 *
 * To run a query within a Vue component, call `useCoreLocationSelectFilteredSingleQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoreLocationSelectFilteredSingleQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useCoreLocationSelectFilteredSingleQuery({
 *   id: // value for 'id'
 * });
 */
export function useCoreLocationSelectFilteredSingleQuery(variables: CoreLocationSelectFilteredSingleQueryVariables | VueCompositionApi.Ref<CoreLocationSelectFilteredSingleQueryVariables> | ReactiveFunction<CoreLocationSelectFilteredSingleQueryVariables>, options: VueApolloComposable.UseQueryOptions<CoreLocationSelectFilteredSingleQuery, CoreLocationSelectFilteredSingleQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CoreLocationSelectFilteredSingleQuery, CoreLocationSelectFilteredSingleQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CoreLocationSelectFilteredSingleQuery, CoreLocationSelectFilteredSingleQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<CoreLocationSelectFilteredSingleQuery, CoreLocationSelectFilteredSingleQueryVariables>(CoreLocationSelectFilteredSingleDocument, variables, options);
}
export function useCoreLocationSelectFilteredSingleLazyQuery(variables: CoreLocationSelectFilteredSingleQueryVariables | VueCompositionApi.Ref<CoreLocationSelectFilteredSingleQueryVariables> | ReactiveFunction<CoreLocationSelectFilteredSingleQueryVariables>, options: VueApolloComposable.UseQueryOptions<CoreLocationSelectFilteredSingleQuery, CoreLocationSelectFilteredSingleQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CoreLocationSelectFilteredSingleQuery, CoreLocationSelectFilteredSingleQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CoreLocationSelectFilteredSingleQuery, CoreLocationSelectFilteredSingleQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<CoreLocationSelectFilteredSingleQuery, CoreLocationSelectFilteredSingleQueryVariables>(CoreLocationSelectFilteredSingleDocument, variables, options);
}
export type CoreLocationSelectFilteredSingleQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<CoreLocationSelectFilteredSingleQuery, CoreLocationSelectFilteredSingleQueryVariables>;
export const CoreLocationSelectFilteredListDocument = gql`
    query coreLocationSelectFilteredList($name: String) {
  core {
    location {
      list(name: $name) {
        data {
          id
          name
        }
      }
    }
  }
}
    `;

/**
 * __useCoreLocationSelectFilteredListQuery__
 *
 * To run a query within a Vue component, call `useCoreLocationSelectFilteredListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoreLocationSelectFilteredListQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useCoreLocationSelectFilteredListQuery({
 *   name: // value for 'name'
 * });
 */
export function useCoreLocationSelectFilteredListQuery(variables: CoreLocationSelectFilteredListQueryVariables | VueCompositionApi.Ref<CoreLocationSelectFilteredListQueryVariables> | ReactiveFunction<CoreLocationSelectFilteredListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<CoreLocationSelectFilteredListQuery, CoreLocationSelectFilteredListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CoreLocationSelectFilteredListQuery, CoreLocationSelectFilteredListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CoreLocationSelectFilteredListQuery, CoreLocationSelectFilteredListQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<CoreLocationSelectFilteredListQuery, CoreLocationSelectFilteredListQueryVariables>(CoreLocationSelectFilteredListDocument, variables, options);
}
export function useCoreLocationSelectFilteredListLazyQuery(variables: CoreLocationSelectFilteredListQueryVariables | VueCompositionApi.Ref<CoreLocationSelectFilteredListQueryVariables> | ReactiveFunction<CoreLocationSelectFilteredListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<CoreLocationSelectFilteredListQuery, CoreLocationSelectFilteredListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CoreLocationSelectFilteredListQuery, CoreLocationSelectFilteredListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CoreLocationSelectFilteredListQuery, CoreLocationSelectFilteredListQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<CoreLocationSelectFilteredListQuery, CoreLocationSelectFilteredListQueryVariables>(CoreLocationSelectFilteredListDocument, variables, options);
}
export type CoreLocationSelectFilteredListQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<CoreLocationSelectFilteredListQuery, CoreLocationSelectFilteredListQueryVariables>;
export const CoreNetworkCreateDocument = gql`
    mutation coreNetworkCreate($input: CoreNetworkCreateInput) {
  core {
    network {
      create(input: $input) {
        id
      }
    }
  }
}
    `;

/**
 * __useCoreNetworkCreateMutation__
 *
 * To run a mutation, you first call `useCoreNetworkCreateMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCoreNetworkCreateMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCoreNetworkCreateMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCoreNetworkCreateMutation(options: VueApolloComposable.UseMutationOptions<CoreNetworkCreateMutation, CoreNetworkCreateMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CoreNetworkCreateMutation, CoreNetworkCreateMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CoreNetworkCreateMutation, CoreNetworkCreateMutationVariables>(CoreNetworkCreateDocument, options);
}
export type CoreNetworkCreateMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CoreNetworkCreateMutation, CoreNetworkCreateMutationVariables>;
export const CoreNetworkSelectFilteredSingleDocument = gql`
    query coreNetworkSelectFilteredSingle($id: ID!) {
  core {
    network {
      single(id: $id) {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useCoreNetworkSelectFilteredSingleQuery__
 *
 * To run a query within a Vue component, call `useCoreNetworkSelectFilteredSingleQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoreNetworkSelectFilteredSingleQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useCoreNetworkSelectFilteredSingleQuery({
 *   id: // value for 'id'
 * });
 */
export function useCoreNetworkSelectFilteredSingleQuery(variables: CoreNetworkSelectFilteredSingleQueryVariables | VueCompositionApi.Ref<CoreNetworkSelectFilteredSingleQueryVariables> | ReactiveFunction<CoreNetworkSelectFilteredSingleQueryVariables>, options: VueApolloComposable.UseQueryOptions<CoreNetworkSelectFilteredSingleQuery, CoreNetworkSelectFilteredSingleQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CoreNetworkSelectFilteredSingleQuery, CoreNetworkSelectFilteredSingleQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CoreNetworkSelectFilteredSingleQuery, CoreNetworkSelectFilteredSingleQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<CoreNetworkSelectFilteredSingleQuery, CoreNetworkSelectFilteredSingleQueryVariables>(CoreNetworkSelectFilteredSingleDocument, variables, options);
}
export function useCoreNetworkSelectFilteredSingleLazyQuery(variables: CoreNetworkSelectFilteredSingleQueryVariables | VueCompositionApi.Ref<CoreNetworkSelectFilteredSingleQueryVariables> | ReactiveFunction<CoreNetworkSelectFilteredSingleQueryVariables>, options: VueApolloComposable.UseQueryOptions<CoreNetworkSelectFilteredSingleQuery, CoreNetworkSelectFilteredSingleQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CoreNetworkSelectFilteredSingleQuery, CoreNetworkSelectFilteredSingleQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CoreNetworkSelectFilteredSingleQuery, CoreNetworkSelectFilteredSingleQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<CoreNetworkSelectFilteredSingleQuery, CoreNetworkSelectFilteredSingleQueryVariables>(CoreNetworkSelectFilteredSingleDocument, variables, options);
}
export type CoreNetworkSelectFilteredSingleQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<CoreNetworkSelectFilteredSingleQuery, CoreNetworkSelectFilteredSingleQueryVariables>;
export const CoreNetworkSelectFilteredListDocument = gql`
    query coreNetworkSelectFilteredList($name: String) {
  core {
    network {
      list(name: $name) {
        data {
          id
          name
        }
      }
    }
  }
}
    `;

/**
 * __useCoreNetworkSelectFilteredListQuery__
 *
 * To run a query within a Vue component, call `useCoreNetworkSelectFilteredListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoreNetworkSelectFilteredListQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useCoreNetworkSelectFilteredListQuery({
 *   name: // value for 'name'
 * });
 */
export function useCoreNetworkSelectFilteredListQuery(variables: CoreNetworkSelectFilteredListQueryVariables | VueCompositionApi.Ref<CoreNetworkSelectFilteredListQueryVariables> | ReactiveFunction<CoreNetworkSelectFilteredListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<CoreNetworkSelectFilteredListQuery, CoreNetworkSelectFilteredListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CoreNetworkSelectFilteredListQuery, CoreNetworkSelectFilteredListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CoreNetworkSelectFilteredListQuery, CoreNetworkSelectFilteredListQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<CoreNetworkSelectFilteredListQuery, CoreNetworkSelectFilteredListQueryVariables>(CoreNetworkSelectFilteredListDocument, variables, options);
}
export function useCoreNetworkSelectFilteredListLazyQuery(variables: CoreNetworkSelectFilteredListQueryVariables | VueCompositionApi.Ref<CoreNetworkSelectFilteredListQueryVariables> | ReactiveFunction<CoreNetworkSelectFilteredListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<CoreNetworkSelectFilteredListQuery, CoreNetworkSelectFilteredListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CoreNetworkSelectFilteredListQuery, CoreNetworkSelectFilteredListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CoreNetworkSelectFilteredListQuery, CoreNetworkSelectFilteredListQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<CoreNetworkSelectFilteredListQuery, CoreNetworkSelectFilteredListQueryVariables>(CoreNetworkSelectFilteredListDocument, variables, options);
}
export type CoreNetworkSelectFilteredListQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<CoreNetworkSelectFilteredListQuery, CoreNetworkSelectFilteredListQueryVariables>;
export const InvitationCreateDocument = gql`
    mutation invitationCreate($input: InvitationCreateInput) {
  invitation {
    create(input: $input) {
      id
    }
  }
}
    `;

/**
 * __useInvitationCreateMutation__
 *
 * To run a mutation, you first call `useInvitationCreateMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useInvitationCreateMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useInvitationCreateMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useInvitationCreateMutation(options: VueApolloComposable.UseMutationOptions<InvitationCreateMutation, InvitationCreateMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<InvitationCreateMutation, InvitationCreateMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<InvitationCreateMutation, InvitationCreateMutationVariables>(InvitationCreateDocument, options);
}
export type InvitationCreateMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<InvitationCreateMutation, InvitationCreateMutationVariables>;
export const TeamCreateDocument = gql`
    mutation teamCreate($input: TeamCreateInput) {
  team {
    create(input: $input) {
      id
    }
  }
}
    `;

/**
 * __useTeamCreateMutation__
 *
 * To run a mutation, you first call `useTeamCreateMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useTeamCreateMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useTeamCreateMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useTeamCreateMutation(options: VueApolloComposable.UseMutationOptions<TeamCreateMutation, TeamCreateMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<TeamCreateMutation, TeamCreateMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<TeamCreateMutation, TeamCreateMutationVariables>(TeamCreateDocument, options);
}
export type TeamCreateMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<TeamCreateMutation, TeamCreateMutationVariables>;
export const EditProfileDocument = gql`
    mutation editProfile($input: UserUpdateInput) {
  user {
    update(input: $input) {
      id
    }
  }
}
    `;

/**
 * __useEditProfileMutation__
 *
 * To run a mutation, you first call `useEditProfileMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useEditProfileMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useEditProfileMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useEditProfileMutation(options: VueApolloComposable.UseMutationOptions<EditProfileMutation, EditProfileMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<EditProfileMutation, EditProfileMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<EditProfileMutation, EditProfileMutationVariables>(EditProfileDocument, options);
}
export type EditProfileMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<EditProfileMutation, EditProfileMutationVariables>;
export const UserSelectFilteredListDocument = gql`
    query UserSelectFilteredList($email: String, $name: String) {
  user {
    list(email: $email, name: $name) {
      data {
        id
        email
        name
        photo
      }
    }
  }
}
    `;

/**
 * __useUserSelectFilteredListQuery__
 *
 * To run a query within a Vue component, call `useUserSelectFilteredListQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserSelectFilteredListQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useUserSelectFilteredListQuery({
 *   email: // value for 'email'
 *   name: // value for 'name'
 * });
 */
export function useUserSelectFilteredListQuery(variables: UserSelectFilteredListQueryVariables | VueCompositionApi.Ref<UserSelectFilteredListQueryVariables> | ReactiveFunction<UserSelectFilteredListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<UserSelectFilteredListQuery, UserSelectFilteredListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UserSelectFilteredListQuery, UserSelectFilteredListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<UserSelectFilteredListQuery, UserSelectFilteredListQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<UserSelectFilteredListQuery, UserSelectFilteredListQueryVariables>(UserSelectFilteredListDocument, variables, options);
}
export function useUserSelectFilteredListLazyQuery(variables: UserSelectFilteredListQueryVariables | VueCompositionApi.Ref<UserSelectFilteredListQueryVariables> | ReactiveFunction<UserSelectFilteredListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<UserSelectFilteredListQuery, UserSelectFilteredListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UserSelectFilteredListQuery, UserSelectFilteredListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<UserSelectFilteredListQuery, UserSelectFilteredListQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<UserSelectFilteredListQuery, UserSelectFilteredListQueryVariables>(UserSelectFilteredListDocument, variables, options);
}
export type UserSelectFilteredListQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<UserSelectFilteredListQuery, UserSelectFilteredListQueryVariables>;
export const CoreContactListDocument = gql`
    query coreContactList($first: Int, $page: Int, $name: String, $email: String, $phone: String, $type: CoreContactTypes) {
  core {
    contact {
      list(
        first: $first
        page: $page
        name: $name
        email: $email
        phone: $phone
        type: $type
      ) {
        paginatorInfo {
          count
          currentPage
          firstItem
          hasMorePages
          lastItem
          lastPage
          perPage
          total
        }
        data {
          company_id
          company {
            id
            name
          }
          created_at
          description
          email
          id
          name
          phone
          photo
          type
          updated_at
        }
      }
    }
  }
}
    `;

/**
 * __useCoreContactListQuery__
 *
 * To run a query within a Vue component, call `useCoreContactListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoreContactListQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useCoreContactListQuery({
 *   first: // value for 'first'
 *   page: // value for 'page'
 *   name: // value for 'name'
 *   email: // value for 'email'
 *   phone: // value for 'phone'
 *   type: // value for 'type'
 * });
 */
export function useCoreContactListQuery(variables: CoreContactListQueryVariables | VueCompositionApi.Ref<CoreContactListQueryVariables> | ReactiveFunction<CoreContactListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<CoreContactListQuery, CoreContactListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CoreContactListQuery, CoreContactListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CoreContactListQuery, CoreContactListQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<CoreContactListQuery, CoreContactListQueryVariables>(CoreContactListDocument, variables, options);
}
export function useCoreContactListLazyQuery(variables: CoreContactListQueryVariables | VueCompositionApi.Ref<CoreContactListQueryVariables> | ReactiveFunction<CoreContactListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<CoreContactListQuery, CoreContactListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CoreContactListQuery, CoreContactListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CoreContactListQuery, CoreContactListQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<CoreContactListQuery, CoreContactListQueryVariables>(CoreContactListDocument, variables, options);
}
export type CoreContactListQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<CoreContactListQuery, CoreContactListQueryVariables>;
export const CoreContactDeleteDocument = gql`
    mutation coreContactDelete($id: ID!) {
  core {
    contact {
      delete(id: $id) {
        id
      }
    }
  }
}
    `;

/**
 * __useCoreContactDeleteMutation__
 *
 * To run a mutation, you first call `useCoreContactDeleteMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCoreContactDeleteMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCoreContactDeleteMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useCoreContactDeleteMutation(options: VueApolloComposable.UseMutationOptions<CoreContactDeleteMutation, CoreContactDeleteMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CoreContactDeleteMutation, CoreContactDeleteMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CoreContactDeleteMutation, CoreContactDeleteMutationVariables>(CoreContactDeleteDocument, options);
}
export type CoreContactDeleteMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CoreContactDeleteMutation, CoreContactDeleteMutationVariables>;
export const CoreContactSingleDocument = gql`
    query coreContactSingle($id: ID) {
  core {
    contact {
      single(id: $id) {
        id
        name
        photo
        type
        phone
        email
        description
        company_id
        company {
          id
          name
        }
        contacts: employees {
          id
        }
        notes {
          id
        }
        attachments {
          id
        }
        locations {
          id
        }
        networks {
          id
        }
        devices {
          id
        }
        audits {
          id
        }
      }
    }
  }
}
    `;

/**
 * __useCoreContactSingleQuery__
 *
 * To run a query within a Vue component, call `useCoreContactSingleQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoreContactSingleQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useCoreContactSingleQuery({
 *   id: // value for 'id'
 * });
 */
export function useCoreContactSingleQuery(variables: CoreContactSingleQueryVariables | VueCompositionApi.Ref<CoreContactSingleQueryVariables> | ReactiveFunction<CoreContactSingleQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<CoreContactSingleQuery, CoreContactSingleQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CoreContactSingleQuery, CoreContactSingleQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CoreContactSingleQuery, CoreContactSingleQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<CoreContactSingleQuery, CoreContactSingleQueryVariables>(CoreContactSingleDocument, variables, options);
}
export function useCoreContactSingleLazyQuery(variables: CoreContactSingleQueryVariables | VueCompositionApi.Ref<CoreContactSingleQueryVariables> | ReactiveFunction<CoreContactSingleQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<CoreContactSingleQuery, CoreContactSingleQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CoreContactSingleQuery, CoreContactSingleQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CoreContactSingleQuery, CoreContactSingleQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<CoreContactSingleQuery, CoreContactSingleQueryVariables>(CoreContactSingleDocument, variables, options);
}
export type CoreContactSingleQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<CoreContactSingleQuery, CoreContactSingleQueryVariables>;
export const CoreContactUpdateDocument = gql`
    mutation coreContactUpdate($input: CoreContactUpdateInput!) {
  core {
    contact {
      update(input: $input) {
        id
      }
    }
  }
}
    `;

/**
 * __useCoreContactUpdateMutation__
 *
 * To run a mutation, you first call `useCoreContactUpdateMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCoreContactUpdateMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCoreContactUpdateMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCoreContactUpdateMutation(options: VueApolloComposable.UseMutationOptions<CoreContactUpdateMutation, CoreContactUpdateMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CoreContactUpdateMutation, CoreContactUpdateMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CoreContactUpdateMutation, CoreContactUpdateMutationVariables>(CoreContactUpdateDocument, options);
}
export type CoreContactUpdateMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CoreContactUpdateMutation, CoreContactUpdateMutationVariables>;
export const CoreDeviceListDocument = gql`
    query coreDeviceList($first: Int, $page: Int, $name: String, $hostname: String, $type: CoreDeviceTypes) {
  core {
    device {
      list(name: $name, hostname: $hostname, first: $first, page: $page, type: $type) {
        paginatorInfo {
          count
          currentPage
          firstItem
          hasMorePages
          lastItem
          lastPage
          perPage
          total
        }
        data {
          created_at
          description
          hostname
          id
          name
          type
          updated_at
        }
      }
    }
  }
}
    `;

/**
 * __useCoreDeviceListQuery__
 *
 * To run a query within a Vue component, call `useCoreDeviceListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoreDeviceListQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useCoreDeviceListQuery({
 *   first: // value for 'first'
 *   page: // value for 'page'
 *   name: // value for 'name'
 *   hostname: // value for 'hostname'
 *   type: // value for 'type'
 * });
 */
export function useCoreDeviceListQuery(variables: CoreDeviceListQueryVariables | VueCompositionApi.Ref<CoreDeviceListQueryVariables> | ReactiveFunction<CoreDeviceListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<CoreDeviceListQuery, CoreDeviceListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CoreDeviceListQuery, CoreDeviceListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CoreDeviceListQuery, CoreDeviceListQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<CoreDeviceListQuery, CoreDeviceListQueryVariables>(CoreDeviceListDocument, variables, options);
}
export function useCoreDeviceListLazyQuery(variables: CoreDeviceListQueryVariables | VueCompositionApi.Ref<CoreDeviceListQueryVariables> | ReactiveFunction<CoreDeviceListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<CoreDeviceListQuery, CoreDeviceListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CoreDeviceListQuery, CoreDeviceListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CoreDeviceListQuery, CoreDeviceListQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<CoreDeviceListQuery, CoreDeviceListQueryVariables>(CoreDeviceListDocument, variables, options);
}
export type CoreDeviceListQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<CoreDeviceListQuery, CoreDeviceListQueryVariables>;
export const CoreDeviceDeleteDocument = gql`
    mutation coreDeviceDelete($id: ID!) {
  core {
    device {
      delete(id: $id) {
        id
      }
    }
  }
}
    `;

/**
 * __useCoreDeviceDeleteMutation__
 *
 * To run a mutation, you first call `useCoreDeviceDeleteMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCoreDeviceDeleteMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCoreDeviceDeleteMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useCoreDeviceDeleteMutation(options: VueApolloComposable.UseMutationOptions<CoreDeviceDeleteMutation, CoreDeviceDeleteMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CoreDeviceDeleteMutation, CoreDeviceDeleteMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CoreDeviceDeleteMutation, CoreDeviceDeleteMutationVariables>(CoreDeviceDeleteDocument, options);
}
export type CoreDeviceDeleteMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CoreDeviceDeleteMutation, CoreDeviceDeleteMutationVariables>;
export const CoreDeviceSingleDocument = gql`
    query coreDeviceSingle($id: ID) {
  core {
    device {
      single(id: $id) {
        id
        name
        hostname
        type
        description
        contacts {
          id
        }
        attachments {
          id
        }
        notes {
          id
        }
        audits {
          id
        }
        addresses {
          id
        }
        networks {
          id
        }
        locations {
          id
        }
        created_at
        updated_at
      }
    }
  }
}
    `;

/**
 * __useCoreDeviceSingleQuery__
 *
 * To run a query within a Vue component, call `useCoreDeviceSingleQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoreDeviceSingleQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useCoreDeviceSingleQuery({
 *   id: // value for 'id'
 * });
 */
export function useCoreDeviceSingleQuery(variables: CoreDeviceSingleQueryVariables | VueCompositionApi.Ref<CoreDeviceSingleQueryVariables> | ReactiveFunction<CoreDeviceSingleQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<CoreDeviceSingleQuery, CoreDeviceSingleQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CoreDeviceSingleQuery, CoreDeviceSingleQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CoreDeviceSingleQuery, CoreDeviceSingleQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<CoreDeviceSingleQuery, CoreDeviceSingleQueryVariables>(CoreDeviceSingleDocument, variables, options);
}
export function useCoreDeviceSingleLazyQuery(variables: CoreDeviceSingleQueryVariables | VueCompositionApi.Ref<CoreDeviceSingleQueryVariables> | ReactiveFunction<CoreDeviceSingleQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<CoreDeviceSingleQuery, CoreDeviceSingleQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CoreDeviceSingleQuery, CoreDeviceSingleQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CoreDeviceSingleQuery, CoreDeviceSingleQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<CoreDeviceSingleQuery, CoreDeviceSingleQueryVariables>(CoreDeviceSingleDocument, variables, options);
}
export type CoreDeviceSingleQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<CoreDeviceSingleQuery, CoreDeviceSingleQueryVariables>;
export const CoreDeviceUpdateDocument = gql`
    mutation coreDeviceUpdate($input: CoreDeviceUpdateInput!) {
  core {
    device {
      update(input: $input) {
        id
      }
    }
  }
}
    `;

/**
 * __useCoreDeviceUpdateMutation__
 *
 * To run a mutation, you first call `useCoreDeviceUpdateMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCoreDeviceUpdateMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCoreDeviceUpdateMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCoreDeviceUpdateMutation(options: VueApolloComposable.UseMutationOptions<CoreDeviceUpdateMutation, CoreDeviceUpdateMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CoreDeviceUpdateMutation, CoreDeviceUpdateMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CoreDeviceUpdateMutation, CoreDeviceUpdateMutationVariables>(CoreDeviceUpdateDocument, options);
}
export type CoreDeviceUpdateMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CoreDeviceUpdateMutation, CoreDeviceUpdateMutationVariables>;
export const CoreLocationListDocument = gql`
    query coreLocationList($first: Int, $page: Int, $name: String, $type: CoreLocationTypes) {
  core {
    location {
      list(first: $first, page: $page, name: $name, type: $type) {
        data {
          id
          name
          parent_id
          parent_location {
            id
            name
          }
          type
          description
          created_at
          address
        }
        paginatorInfo {
          firstItem
          lastItem
          count
          currentPage
          hasMorePages
          lastPage
          perPage
          total
        }
      }
    }
  }
}
    `;

/**
 * __useCoreLocationListQuery__
 *
 * To run a query within a Vue component, call `useCoreLocationListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoreLocationListQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useCoreLocationListQuery({
 *   first: // value for 'first'
 *   page: // value for 'page'
 *   name: // value for 'name'
 *   type: // value for 'type'
 * });
 */
export function useCoreLocationListQuery(variables: CoreLocationListQueryVariables | VueCompositionApi.Ref<CoreLocationListQueryVariables> | ReactiveFunction<CoreLocationListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<CoreLocationListQuery, CoreLocationListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CoreLocationListQuery, CoreLocationListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CoreLocationListQuery, CoreLocationListQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<CoreLocationListQuery, CoreLocationListQueryVariables>(CoreLocationListDocument, variables, options);
}
export function useCoreLocationListLazyQuery(variables: CoreLocationListQueryVariables | VueCompositionApi.Ref<CoreLocationListQueryVariables> | ReactiveFunction<CoreLocationListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<CoreLocationListQuery, CoreLocationListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CoreLocationListQuery, CoreLocationListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CoreLocationListQuery, CoreLocationListQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<CoreLocationListQuery, CoreLocationListQueryVariables>(CoreLocationListDocument, variables, options);
}
export type CoreLocationListQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<CoreLocationListQuery, CoreLocationListQueryVariables>;
export const CoreLocationDeleteDocument = gql`
    mutation coreLocationDelete($id: ID!) {
  core {
    location {
      delete(id: $id) {
        id
      }
    }
  }
}
    `;

/**
 * __useCoreLocationDeleteMutation__
 *
 * To run a mutation, you first call `useCoreLocationDeleteMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCoreLocationDeleteMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCoreLocationDeleteMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useCoreLocationDeleteMutation(options: VueApolloComposable.UseMutationOptions<CoreLocationDeleteMutation, CoreLocationDeleteMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CoreLocationDeleteMutation, CoreLocationDeleteMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CoreLocationDeleteMutation, CoreLocationDeleteMutationVariables>(CoreLocationDeleteDocument, options);
}
export type CoreLocationDeleteMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CoreLocationDeleteMutation, CoreLocationDeleteMutationVariables>;
export const CoreLocationSingleDocument = gql`
    query coreLocationSingle($id: ID) {
  core {
    location {
      single(id: $id) {
        id
        name
        type
        description
        address
        parent_id
        parent_location {
          id
          name
          type
        }
        contacts {
          id
        }
        notes {
          id
        }
        attachments {
          id
        }
        networks {
          id
        }
        devices {
          id
        }
        audits {
          id
        }
        created_at
        updated_at
      }
    }
  }
}
    `;

/**
 * __useCoreLocationSingleQuery__
 *
 * To run a query within a Vue component, call `useCoreLocationSingleQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoreLocationSingleQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useCoreLocationSingleQuery({
 *   id: // value for 'id'
 * });
 */
export function useCoreLocationSingleQuery(variables: CoreLocationSingleQueryVariables | VueCompositionApi.Ref<CoreLocationSingleQueryVariables> | ReactiveFunction<CoreLocationSingleQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<CoreLocationSingleQuery, CoreLocationSingleQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CoreLocationSingleQuery, CoreLocationSingleQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CoreLocationSingleQuery, CoreLocationSingleQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<CoreLocationSingleQuery, CoreLocationSingleQueryVariables>(CoreLocationSingleDocument, variables, options);
}
export function useCoreLocationSingleLazyQuery(variables: CoreLocationSingleQueryVariables | VueCompositionApi.Ref<CoreLocationSingleQueryVariables> | ReactiveFunction<CoreLocationSingleQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<CoreLocationSingleQuery, CoreLocationSingleQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CoreLocationSingleQuery, CoreLocationSingleQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CoreLocationSingleQuery, CoreLocationSingleQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<CoreLocationSingleQuery, CoreLocationSingleQueryVariables>(CoreLocationSingleDocument, variables, options);
}
export type CoreLocationSingleQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<CoreLocationSingleQuery, CoreLocationSingleQueryVariables>;
export const CoreLocationUpdateDocument = gql`
    mutation coreLocationUpdate($input: CoreLocationUpdateInput!) {
  core {
    location {
      update(input: $input) {
        id
      }
    }
  }
}
    `;

/**
 * __useCoreLocationUpdateMutation__
 *
 * To run a mutation, you first call `useCoreLocationUpdateMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCoreLocationUpdateMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCoreLocationUpdateMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCoreLocationUpdateMutation(options: VueApolloComposable.UseMutationOptions<CoreLocationUpdateMutation, CoreLocationUpdateMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CoreLocationUpdateMutation, CoreLocationUpdateMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CoreLocationUpdateMutation, CoreLocationUpdateMutationVariables>(CoreLocationUpdateDocument, options);
}
export type CoreLocationUpdateMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CoreLocationUpdateMutation, CoreLocationUpdateMutationVariables>;
export const CoreNetworkListDocument = gql`
    query coreNetworkList($perPage: Int, $page: Int, $name: String, $network: String) {
  core {
    network {
      list(first: $perPage, page: $page, name: $name, network: $network) {
        data {
          id
          name
          parent_id
          description
          created_at
          network
          mask
          updated_at
          parent_network {
            id
            name
          }
        }
        paginatorInfo {
          firstItem
          lastItem
          count
          currentPage
          hasMorePages
          lastPage
          perPage
          total
        }
      }
    }
  }
}
    `;

/**
 * __useCoreNetworkListQuery__
 *
 * To run a query within a Vue component, call `useCoreNetworkListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoreNetworkListQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useCoreNetworkListQuery({
 *   perPage: // value for 'perPage'
 *   page: // value for 'page'
 *   name: // value for 'name'
 *   network: // value for 'network'
 * });
 */
export function useCoreNetworkListQuery(variables: CoreNetworkListQueryVariables | VueCompositionApi.Ref<CoreNetworkListQueryVariables> | ReactiveFunction<CoreNetworkListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<CoreNetworkListQuery, CoreNetworkListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CoreNetworkListQuery, CoreNetworkListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CoreNetworkListQuery, CoreNetworkListQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<CoreNetworkListQuery, CoreNetworkListQueryVariables>(CoreNetworkListDocument, variables, options);
}
export function useCoreNetworkListLazyQuery(variables: CoreNetworkListQueryVariables | VueCompositionApi.Ref<CoreNetworkListQueryVariables> | ReactiveFunction<CoreNetworkListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<CoreNetworkListQuery, CoreNetworkListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CoreNetworkListQuery, CoreNetworkListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CoreNetworkListQuery, CoreNetworkListQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<CoreNetworkListQuery, CoreNetworkListQueryVariables>(CoreNetworkListDocument, variables, options);
}
export type CoreNetworkListQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<CoreNetworkListQuery, CoreNetworkListQueryVariables>;
export const CoreNetworkDeleteDocument = gql`
    mutation coreNetworkDelete($id: ID!) {
  core {
    network {
      delete(id: $id) {
        id
      }
    }
  }
}
    `;

/**
 * __useCoreNetworkDeleteMutation__
 *
 * To run a mutation, you first call `useCoreNetworkDeleteMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCoreNetworkDeleteMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCoreNetworkDeleteMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useCoreNetworkDeleteMutation(options: VueApolloComposable.UseMutationOptions<CoreNetworkDeleteMutation, CoreNetworkDeleteMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CoreNetworkDeleteMutation, CoreNetworkDeleteMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CoreNetworkDeleteMutation, CoreNetworkDeleteMutationVariables>(CoreNetworkDeleteDocument, options);
}
export type CoreNetworkDeleteMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CoreNetworkDeleteMutation, CoreNetworkDeleteMutationVariables>;
export const CoreNetworkSingleDocument = gql`
    query coreNetworkSingle($id: ID) {
  core {
    network {
      single(id: $id) {
        id
        name
        description
        network
        mask
        parent_id
        parent_network {
          id
          name
          network
        }
        subnets {
          id
          name
          network
        }
        contacts {
          id
        }
        notes {
          id
        }
        attachments {
          id
        }
        locations {
          id
        }
        devices {
          id
        }
        audits {
          id
        }
        created_at
        updated_at
      }
    }
  }
}
    `;

/**
 * __useCoreNetworkSingleQuery__
 *
 * To run a query within a Vue component, call `useCoreNetworkSingleQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoreNetworkSingleQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useCoreNetworkSingleQuery({
 *   id: // value for 'id'
 * });
 */
export function useCoreNetworkSingleQuery(variables: CoreNetworkSingleQueryVariables | VueCompositionApi.Ref<CoreNetworkSingleQueryVariables> | ReactiveFunction<CoreNetworkSingleQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<CoreNetworkSingleQuery, CoreNetworkSingleQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CoreNetworkSingleQuery, CoreNetworkSingleQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CoreNetworkSingleQuery, CoreNetworkSingleQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<CoreNetworkSingleQuery, CoreNetworkSingleQueryVariables>(CoreNetworkSingleDocument, variables, options);
}
export function useCoreNetworkSingleLazyQuery(variables: CoreNetworkSingleQueryVariables | VueCompositionApi.Ref<CoreNetworkSingleQueryVariables> | ReactiveFunction<CoreNetworkSingleQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<CoreNetworkSingleQuery, CoreNetworkSingleQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CoreNetworkSingleQuery, CoreNetworkSingleQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CoreNetworkSingleQuery, CoreNetworkSingleQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<CoreNetworkSingleQuery, CoreNetworkSingleQueryVariables>(CoreNetworkSingleDocument, variables, options);
}
export type CoreNetworkSingleQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<CoreNetworkSingleQuery, CoreNetworkSingleQueryVariables>;
export const CoreNetworkUpdateDocument = gql`
    mutation coreNetworkUpdate($input: CoreNetworkUpdateInput!) {
  core {
    network {
      update(input: $input) {
        id
      }
    }
  }
}
    `;

/**
 * __useCoreNetworkUpdateMutation__
 *
 * To run a mutation, you first call `useCoreNetworkUpdateMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCoreNetworkUpdateMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCoreNetworkUpdateMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCoreNetworkUpdateMutation(options: VueApolloComposable.UseMutationOptions<CoreNetworkUpdateMutation, CoreNetworkUpdateMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CoreNetworkUpdateMutation, CoreNetworkUpdateMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CoreNetworkUpdateMutation, CoreNetworkUpdateMutationVariables>(CoreNetworkUpdateDocument, options);
}
export type CoreNetworkUpdateMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CoreNetworkUpdateMutation, CoreNetworkUpdateMutationVariables>;
export const InvitationListDocument = gql`
    query invitationList {
  user {
    me {
      invitations {
        id
        inviter {
          id
          email
          name
          photo
        }
        team {
          id
          name
          photo
          personal
          description
        }
      }
    }
  }
}
    `;

/**
 * __useInvitationListQuery__
 *
 * To run a query within a Vue component, call `useInvitationListQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvitationListQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useInvitationListQuery();
 */
export function useInvitationListQuery(options: VueApolloComposable.UseQueryOptions<InvitationListQuery, InvitationListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<InvitationListQuery, InvitationListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<InvitationListQuery, InvitationListQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<InvitationListQuery, InvitationListQueryVariables>(InvitationListDocument, {}, options);
}
export function useInvitationListLazyQuery(options: VueApolloComposable.UseQueryOptions<InvitationListQuery, InvitationListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<InvitationListQuery, InvitationListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<InvitationListQuery, InvitationListQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<InvitationListQuery, InvitationListQueryVariables>(InvitationListDocument, {}, options);
}
export type InvitationListQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<InvitationListQuery, InvitationListQueryVariables>;
export const TeamViewCurrentDocument = gql`
    query teamViewCurrent($id: ID) {
  team {
    single(id: $id) {
      id
      name
      personal
      description
      photo
      updated_at
      created_at
      agents {
        id
        name
      }
      invitations {
        id
        accepted
        email
        inviter {
          id
          name
          photo
        }
        user {
          id
          name
          photo
        }
      }
      users {
        id
        name
        pivot {
          role
        }
        photo
      }
    }
  }
}
    `;

/**
 * __useTeamViewCurrentQuery__
 *
 * To run a query within a Vue component, call `useTeamViewCurrentQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamViewCurrentQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useTeamViewCurrentQuery({
 *   id: // value for 'id'
 * });
 */
export function useTeamViewCurrentQuery(variables: TeamViewCurrentQueryVariables | VueCompositionApi.Ref<TeamViewCurrentQueryVariables> | ReactiveFunction<TeamViewCurrentQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<TeamViewCurrentQuery, TeamViewCurrentQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<TeamViewCurrentQuery, TeamViewCurrentQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<TeamViewCurrentQuery, TeamViewCurrentQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<TeamViewCurrentQuery, TeamViewCurrentQueryVariables>(TeamViewCurrentDocument, variables, options);
}
export function useTeamViewCurrentLazyQuery(variables: TeamViewCurrentQueryVariables | VueCompositionApi.Ref<TeamViewCurrentQueryVariables> | ReactiveFunction<TeamViewCurrentQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<TeamViewCurrentQuery, TeamViewCurrentQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<TeamViewCurrentQuery, TeamViewCurrentQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<TeamViewCurrentQuery, TeamViewCurrentQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<TeamViewCurrentQuery, TeamViewCurrentQueryVariables>(TeamViewCurrentDocument, variables, options);
}
export type TeamViewCurrentQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<TeamViewCurrentQuery, TeamViewCurrentQueryVariables>;
export const ForgotPasswordDocument = gql`
    mutation forgotPassword($input: ForgotPasswordInput!) {
  auth {
    forgotPassword(input: $input) {
      status
      message
    }
  }
}
    `;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useForgotPasswordMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useForgotPasswordMutation(options: VueApolloComposable.UseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
}
export type ForgotPasswordMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation login($input: LoginInput) {
  auth {
    login(input: $input) {
      access_token
      refresh_token
      expires_in
      token_type
      user {
        id
        email
        name
        photo
        personal_team {
          id
          name
          photo
        }
        teams {
          id
          name
          photo
        }
        invitations {
          id
        }
        created_at
        updated_at
      }
    }
  }
}
    `;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLoginMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(options: VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LoginMutation, LoginMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation refreshToken($input: RefreshTokenInput) {
  auth {
    refreshToken(input: $input) {
      access_token
      expires_in
      refresh_token
      token_type
    }
  }
}
    `;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRefreshTokenMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useRefreshTokenMutation(options: VueApolloComposable.UseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
}
export type RefreshTokenMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const RegisterDocument = gql`
    mutation register($input: RegisterInput!) {
  auth {
    register(input: $input) {
      status
      tokens {
        access_token
        refresh_token
        expires_in
        token_type
        user {
          id
          name
          photo
          personal_team {
            id
            name
            photo
          }
          teams {
            id
            name
            photo
          }
          invitations {
            id
          }
          email
          email_verified_at
        }
      }
    }
  }
}
    `;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRegisterMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(options: VueApolloComposable.UseMutationOptions<RegisterMutation, RegisterMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RegisterMutation, RegisterMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
}
export type RegisterMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RegisterMutation, RegisterMutationVariables>;
export const UpdateForgottenPasswordDocument = gql`
    mutation updateForgottenPassword($input: NewPasswordWithCodeInput!) {
  auth {
    updateForgottenPassword(input: $input) {
      status
      message
    }
  }
}
    `;

/**
 * __useUpdateForgottenPasswordMutation__
 *
 * To run a mutation, you first call `useUpdateForgottenPasswordMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateForgottenPasswordMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateForgottenPasswordMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useUpdateForgottenPasswordMutation(options: VueApolloComposable.UseMutationOptions<UpdateForgottenPasswordMutation, UpdateForgottenPasswordMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateForgottenPasswordMutation, UpdateForgottenPasswordMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UpdateForgottenPasswordMutation, UpdateForgottenPasswordMutationVariables>(UpdateForgottenPasswordDocument, options);
}
export type UpdateForgottenPasswordMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateForgottenPasswordMutation, UpdateForgottenPasswordMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  auth {
    logout {
      status
      message
    }
  }
}
    `;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLogoutMutation();
 */
export function useLogoutMutation(options: VueApolloComposable.UseMutationOptions<LogoutMutation, LogoutMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LogoutMutation, LogoutMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
}
export type LogoutMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LogoutMutation, LogoutMutationVariables>;
export const CurrentUserDocument = gql`
    query currentUser {
  user {
    me {
      id
      email
      name
      photo
      personal_team {
        id
        name
        photo
      }
      teams {
        id
        name
        photo
      }
      invitations {
        id
      }
      created_at
      updated_at
    }
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a Vue component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useCurrentUserQuery();
 */
export function useCurrentUserQuery(options: VueApolloComposable.UseQueryOptions<CurrentUserQuery, CurrentUserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CurrentUserQuery, CurrentUserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CurrentUserQuery, CurrentUserQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, {}, options);
}
export function useCurrentUserLazyQuery(options: VueApolloComposable.UseQueryOptions<CurrentUserQuery, CurrentUserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CurrentUserQuery, CurrentUserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CurrentUserQuery, CurrentUserQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, {}, options);
}
export type CurrentUserQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<CurrentUserQuery, CurrentUserQueryVariables>;
export const WidgetAuditListDocument = gql`
    query widgetAuditList($includeIds: [ID!], $first: Int, $page: Int) {
  audit {
    list(includeIds: $includeIds, page: $page, first: $first) {
      data {
        auditable_id
        auditable_type
        created_at
        event
        id
        ip_address
        new_values
        old_values
        tags
        url
        user {
          ... on User {
            id
            name
            photo
          }
          ... on Agent {
            id
            name
          }
        }
        user_agent
      }
      paginatorInfo {
        count
        currentPage
        firstItem
        hasMorePages
        lastItem
        lastPage
        perPage
        total
      }
    }
  }
}
    `;

/**
 * __useWidgetAuditListQuery__
 *
 * To run a query within a Vue component, call `useWidgetAuditListQuery` and pass it any options that fit your needs.
 * When your component renders, `useWidgetAuditListQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useWidgetAuditListQuery({
 *   includeIds: // value for 'includeIds'
 *   first: // value for 'first'
 *   page: // value for 'page'
 * });
 */
export function useWidgetAuditListQuery(variables: WidgetAuditListQueryVariables | VueCompositionApi.Ref<WidgetAuditListQueryVariables> | ReactiveFunction<WidgetAuditListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<WidgetAuditListQuery, WidgetAuditListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<WidgetAuditListQuery, WidgetAuditListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<WidgetAuditListQuery, WidgetAuditListQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<WidgetAuditListQuery, WidgetAuditListQueryVariables>(WidgetAuditListDocument, variables, options);
}
export function useWidgetAuditListLazyQuery(variables: WidgetAuditListQueryVariables | VueCompositionApi.Ref<WidgetAuditListQueryVariables> | ReactiveFunction<WidgetAuditListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<WidgetAuditListQuery, WidgetAuditListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<WidgetAuditListQuery, WidgetAuditListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<WidgetAuditListQuery, WidgetAuditListQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<WidgetAuditListQuery, WidgetAuditListQueryVariables>(WidgetAuditListDocument, variables, options);
}
export type WidgetAuditListQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<WidgetAuditListQuery, WidgetAuditListQueryVariables>;
export const WidgetCoreAttachmentListDocument = gql`
    query widgetCoreAttachmentList($includeIds: [ID!]) {
  core {
    attachment {
      list(includeIds: $includeIds) {
        data {
          content_type
          created_at
          id
          link
          name
          size
          updated_at
        }
        paginatorInfo {
          count
          currentPage
          firstItem
          hasMorePages
          lastItem
          lastPage
          perPage
          total
        }
      }
    }
  }
}
    `;

/**
 * __useWidgetCoreAttachmentListQuery__
 *
 * To run a query within a Vue component, call `useWidgetCoreAttachmentListQuery` and pass it any options that fit your needs.
 * When your component renders, `useWidgetCoreAttachmentListQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useWidgetCoreAttachmentListQuery({
 *   includeIds: // value for 'includeIds'
 * });
 */
export function useWidgetCoreAttachmentListQuery(variables: WidgetCoreAttachmentListQueryVariables | VueCompositionApi.Ref<WidgetCoreAttachmentListQueryVariables> | ReactiveFunction<WidgetCoreAttachmentListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<WidgetCoreAttachmentListQuery, WidgetCoreAttachmentListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<WidgetCoreAttachmentListQuery, WidgetCoreAttachmentListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<WidgetCoreAttachmentListQuery, WidgetCoreAttachmentListQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<WidgetCoreAttachmentListQuery, WidgetCoreAttachmentListQueryVariables>(WidgetCoreAttachmentListDocument, variables, options);
}
export function useWidgetCoreAttachmentListLazyQuery(variables: WidgetCoreAttachmentListQueryVariables | VueCompositionApi.Ref<WidgetCoreAttachmentListQueryVariables> | ReactiveFunction<WidgetCoreAttachmentListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<WidgetCoreAttachmentListQuery, WidgetCoreAttachmentListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<WidgetCoreAttachmentListQuery, WidgetCoreAttachmentListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<WidgetCoreAttachmentListQuery, WidgetCoreAttachmentListQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<WidgetCoreAttachmentListQuery, WidgetCoreAttachmentListQueryVariables>(WidgetCoreAttachmentListDocument, variables, options);
}
export type WidgetCoreAttachmentListQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<WidgetCoreAttachmentListQuery, WidgetCoreAttachmentListQueryVariables>;
export const WidgetCoreContactListDocument = gql`
    query widgetCoreContactList($includeIds: [ID!]) {
  core {
    contact {
      list(includeIds: $includeIds) {
        data {
          company {
            name
            id
          }
          description
          email
          name
          id
          phone
          photo
        }
        paginatorInfo {
          count
          currentPage
          firstItem
          hasMorePages
          lastItem
          lastPage
          perPage
          total
        }
      }
    }
  }
}
    `;

/**
 * __useWidgetCoreContactListQuery__
 *
 * To run a query within a Vue component, call `useWidgetCoreContactListQuery` and pass it any options that fit your needs.
 * When your component renders, `useWidgetCoreContactListQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useWidgetCoreContactListQuery({
 *   includeIds: // value for 'includeIds'
 * });
 */
export function useWidgetCoreContactListQuery(variables: WidgetCoreContactListQueryVariables | VueCompositionApi.Ref<WidgetCoreContactListQueryVariables> | ReactiveFunction<WidgetCoreContactListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<WidgetCoreContactListQuery, WidgetCoreContactListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<WidgetCoreContactListQuery, WidgetCoreContactListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<WidgetCoreContactListQuery, WidgetCoreContactListQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<WidgetCoreContactListQuery, WidgetCoreContactListQueryVariables>(WidgetCoreContactListDocument, variables, options);
}
export function useWidgetCoreContactListLazyQuery(variables: WidgetCoreContactListQueryVariables | VueCompositionApi.Ref<WidgetCoreContactListQueryVariables> | ReactiveFunction<WidgetCoreContactListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<WidgetCoreContactListQuery, WidgetCoreContactListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<WidgetCoreContactListQuery, WidgetCoreContactListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<WidgetCoreContactListQuery, WidgetCoreContactListQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<WidgetCoreContactListQuery, WidgetCoreContactListQueryVariables>(WidgetCoreContactListDocument, variables, options);
}
export type WidgetCoreContactListQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<WidgetCoreContactListQuery, WidgetCoreContactListQueryVariables>;
export const WidgetCoreDeviceListDocument = gql`
    query widgetCoreDeviceList($includeIds: [ID!]) {
  core {
    device {
      list(includeIds: $includeIds) {
        data {
          id
          name
          hostname
          description
          type
        }
        paginatorInfo {
          count
          currentPage
          firstItem
          hasMorePages
          lastItem
          lastPage
          perPage
          total
        }
      }
    }
  }
}
    `;

/**
 * __useWidgetCoreDeviceListQuery__
 *
 * To run a query within a Vue component, call `useWidgetCoreDeviceListQuery` and pass it any options that fit your needs.
 * When your component renders, `useWidgetCoreDeviceListQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useWidgetCoreDeviceListQuery({
 *   includeIds: // value for 'includeIds'
 * });
 */
export function useWidgetCoreDeviceListQuery(variables: WidgetCoreDeviceListQueryVariables | VueCompositionApi.Ref<WidgetCoreDeviceListQueryVariables> | ReactiveFunction<WidgetCoreDeviceListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<WidgetCoreDeviceListQuery, WidgetCoreDeviceListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<WidgetCoreDeviceListQuery, WidgetCoreDeviceListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<WidgetCoreDeviceListQuery, WidgetCoreDeviceListQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<WidgetCoreDeviceListQuery, WidgetCoreDeviceListQueryVariables>(WidgetCoreDeviceListDocument, variables, options);
}
export function useWidgetCoreDeviceListLazyQuery(variables: WidgetCoreDeviceListQueryVariables | VueCompositionApi.Ref<WidgetCoreDeviceListQueryVariables> | ReactiveFunction<WidgetCoreDeviceListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<WidgetCoreDeviceListQuery, WidgetCoreDeviceListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<WidgetCoreDeviceListQuery, WidgetCoreDeviceListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<WidgetCoreDeviceListQuery, WidgetCoreDeviceListQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<WidgetCoreDeviceListQuery, WidgetCoreDeviceListQueryVariables>(WidgetCoreDeviceListDocument, variables, options);
}
export type WidgetCoreDeviceListQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<WidgetCoreDeviceListQuery, WidgetCoreDeviceListQueryVariables>;
export const WidgetCoreLocationListDocument = gql`
    query widgetCoreLocationList($includeIds: [ID!]) {
  core {
    location {
      list(includeIds: $includeIds) {
        data {
          id
          name
          type
          description
          address
          created_at
          updated_at
        }
        paginatorInfo {
          count
          currentPage
          firstItem
          hasMorePages
          lastItem
          lastPage
          perPage
          total
        }
      }
    }
  }
}
    `;

/**
 * __useWidgetCoreLocationListQuery__
 *
 * To run a query within a Vue component, call `useWidgetCoreLocationListQuery` and pass it any options that fit your needs.
 * When your component renders, `useWidgetCoreLocationListQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useWidgetCoreLocationListQuery({
 *   includeIds: // value for 'includeIds'
 * });
 */
export function useWidgetCoreLocationListQuery(variables: WidgetCoreLocationListQueryVariables | VueCompositionApi.Ref<WidgetCoreLocationListQueryVariables> | ReactiveFunction<WidgetCoreLocationListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<WidgetCoreLocationListQuery, WidgetCoreLocationListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<WidgetCoreLocationListQuery, WidgetCoreLocationListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<WidgetCoreLocationListQuery, WidgetCoreLocationListQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<WidgetCoreLocationListQuery, WidgetCoreLocationListQueryVariables>(WidgetCoreLocationListDocument, variables, options);
}
export function useWidgetCoreLocationListLazyQuery(variables: WidgetCoreLocationListQueryVariables | VueCompositionApi.Ref<WidgetCoreLocationListQueryVariables> | ReactiveFunction<WidgetCoreLocationListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<WidgetCoreLocationListQuery, WidgetCoreLocationListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<WidgetCoreLocationListQuery, WidgetCoreLocationListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<WidgetCoreLocationListQuery, WidgetCoreLocationListQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<WidgetCoreLocationListQuery, WidgetCoreLocationListQueryVariables>(WidgetCoreLocationListDocument, variables, options);
}
export type WidgetCoreLocationListQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<WidgetCoreLocationListQuery, WidgetCoreLocationListQueryVariables>;
export const WidgetCoreLocationTreeDocument = gql`
    query widgetCoreLocationTree($parentId: ID) {
  core {
    location {
      list(parentId: $parentId) {
        data {
          id
          name
          type
        }
      }
    }
  }
}
    `;

/**
 * __useWidgetCoreLocationTreeQuery__
 *
 * To run a query within a Vue component, call `useWidgetCoreLocationTreeQuery` and pass it any options that fit your needs.
 * When your component renders, `useWidgetCoreLocationTreeQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useWidgetCoreLocationTreeQuery({
 *   parentId: // value for 'parentId'
 * });
 */
export function useWidgetCoreLocationTreeQuery(variables: WidgetCoreLocationTreeQueryVariables | VueCompositionApi.Ref<WidgetCoreLocationTreeQueryVariables> | ReactiveFunction<WidgetCoreLocationTreeQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<WidgetCoreLocationTreeQuery, WidgetCoreLocationTreeQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<WidgetCoreLocationTreeQuery, WidgetCoreLocationTreeQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<WidgetCoreLocationTreeQuery, WidgetCoreLocationTreeQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<WidgetCoreLocationTreeQuery, WidgetCoreLocationTreeQueryVariables>(WidgetCoreLocationTreeDocument, variables, options);
}
export function useWidgetCoreLocationTreeLazyQuery(variables: WidgetCoreLocationTreeQueryVariables | VueCompositionApi.Ref<WidgetCoreLocationTreeQueryVariables> | ReactiveFunction<WidgetCoreLocationTreeQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<WidgetCoreLocationTreeQuery, WidgetCoreLocationTreeQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<WidgetCoreLocationTreeQuery, WidgetCoreLocationTreeQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<WidgetCoreLocationTreeQuery, WidgetCoreLocationTreeQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<WidgetCoreLocationTreeQuery, WidgetCoreLocationTreeQueryVariables>(WidgetCoreLocationTreeDocument, variables, options);
}
export type WidgetCoreLocationTreeQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<WidgetCoreLocationTreeQuery, WidgetCoreLocationTreeQueryVariables>;
export const WidgetCoreNetworkListDocument = gql`
    query widgetCoreNetworkList($includeIds: [ID!]) {
  core {
    network {
      list(includeIds: $includeIds) {
        data {
          id
          name
          description
          network
          mask
          parent_id
          parent_network {
            id
            name
            network
          }
          subnets {
            id
          }
          created_at
          updated_at
        }
        paginatorInfo {
          count
          currentPage
          firstItem
          hasMorePages
          lastItem
          lastPage
          perPage
          total
        }
      }
    }
  }
}
    `;

/**
 * __useWidgetCoreNetworkListQuery__
 *
 * To run a query within a Vue component, call `useWidgetCoreNetworkListQuery` and pass it any options that fit your needs.
 * When your component renders, `useWidgetCoreNetworkListQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useWidgetCoreNetworkListQuery({
 *   includeIds: // value for 'includeIds'
 * });
 */
export function useWidgetCoreNetworkListQuery(variables: WidgetCoreNetworkListQueryVariables | VueCompositionApi.Ref<WidgetCoreNetworkListQueryVariables> | ReactiveFunction<WidgetCoreNetworkListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<WidgetCoreNetworkListQuery, WidgetCoreNetworkListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<WidgetCoreNetworkListQuery, WidgetCoreNetworkListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<WidgetCoreNetworkListQuery, WidgetCoreNetworkListQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<WidgetCoreNetworkListQuery, WidgetCoreNetworkListQueryVariables>(WidgetCoreNetworkListDocument, variables, options);
}
export function useWidgetCoreNetworkListLazyQuery(variables: WidgetCoreNetworkListQueryVariables | VueCompositionApi.Ref<WidgetCoreNetworkListQueryVariables> | ReactiveFunction<WidgetCoreNetworkListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<WidgetCoreNetworkListQuery, WidgetCoreNetworkListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<WidgetCoreNetworkListQuery, WidgetCoreNetworkListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<WidgetCoreNetworkListQuery, WidgetCoreNetworkListQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<WidgetCoreNetworkListQuery, WidgetCoreNetworkListQueryVariables>(WidgetCoreNetworkListDocument, variables, options);
}
export type WidgetCoreNetworkListQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<WidgetCoreNetworkListQuery, WidgetCoreNetworkListQueryVariables>;
export const WidgetCoreNoteListDocument = gql`
    query widgetCoreNoteList($includeIds: [ID!]) {
  core {
    note {
      list(includeIds: $includeIds) {
        data {
          content
          created_at
          id
          updated_at
          user {
            id
            name
            photo
            pivot {
              role
            }
          }
        }
        paginatorInfo {
          count
          currentPage
          firstItem
          hasMorePages
          lastItem
          lastPage
          perPage
          total
        }
      }
    }
  }
}
    `;

/**
 * __useWidgetCoreNoteListQuery__
 *
 * To run a query within a Vue component, call `useWidgetCoreNoteListQuery` and pass it any options that fit your needs.
 * When your component renders, `useWidgetCoreNoteListQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useWidgetCoreNoteListQuery({
 *   includeIds: // value for 'includeIds'
 * });
 */
export function useWidgetCoreNoteListQuery(variables: WidgetCoreNoteListQueryVariables | VueCompositionApi.Ref<WidgetCoreNoteListQueryVariables> | ReactiveFunction<WidgetCoreNoteListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<WidgetCoreNoteListQuery, WidgetCoreNoteListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<WidgetCoreNoteListQuery, WidgetCoreNoteListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<WidgetCoreNoteListQuery, WidgetCoreNoteListQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<WidgetCoreNoteListQuery, WidgetCoreNoteListQueryVariables>(WidgetCoreNoteListDocument, variables, options);
}
export function useWidgetCoreNoteListLazyQuery(variables: WidgetCoreNoteListQueryVariables | VueCompositionApi.Ref<WidgetCoreNoteListQueryVariables> | ReactiveFunction<WidgetCoreNoteListQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<WidgetCoreNoteListQuery, WidgetCoreNoteListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<WidgetCoreNoteListQuery, WidgetCoreNoteListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<WidgetCoreNoteListQuery, WidgetCoreNoteListQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<WidgetCoreNoteListQuery, WidgetCoreNoteListQueryVariables>(WidgetCoreNoteListDocument, variables, options);
}
export type WidgetCoreNoteListQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<WidgetCoreNoteListQuery, WidgetCoreNoteListQueryVariables>;