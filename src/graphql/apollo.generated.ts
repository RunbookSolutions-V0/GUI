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
  /** The company to which the contact belongs. */
  company?: Maybe<CoreContact>;
  /** The ID of the company to which the contact belongs. */
  company_id?: Maybe<Scalars['ID']['output']>;
  /** Timestamp when the contact was created. */
  created_at: Scalars['DateTime']['output'];
  /** Optional description for the contact. */
  description?: Maybe<Scalars['String']['output']>;
  /** The email address of the contact. */
  email?: Maybe<Scalars['String']['output']>;
  /** Employees associated with the contact. */
  employees?: Maybe<Array<CoreContact>>;
  id: Scalars['ID']['output'];
  /** The name of the contact. */
  name: Scalars['String']['output'];
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
  /** The email address of the contact. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** The file to upload as the contact's profile photo. */
  file?: InputMaybe<VaporFileUpload>;
  /** The name of the contact. */
  name: Scalars['String']['input'];
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
  first?: Scalars['Int']['input'];
  includeIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<CoreContactTypes>;
};


/** Queries for retrieving Core Contacts. */
export type CoreContactQueriesSingleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Type representing the different types of Core Contacts, either company or person. */
export enum CoreContactTypes {
  COMPANY = 'company',
  PERSON = 'person'
}

/** Input for updating an existing Core Contact instance. */
export type CoreContactUpdateInput = {
  /** New attachments associated with the contact. */
  attachments?: InputMaybe<CoreAttachmentCreateBelongsToMany>;
  /** The new ID of the company to which the contact belongs. */
  company_id?: InputMaybe<Scalars['ID']['input']>;
  /** The new description for the contact. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The new email address of the contact. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** The new file to upload as the contact's profile photo. */
  file?: InputMaybe<VaporFileUpload>;
  /** Unique identifier of the contact. */
  id: Scalars['ID']['input'];
  /** The new name of the contact. */
  name?: InputMaybe<Scalars['String']['input']>;
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
  /** The new email address of the contact. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** The new file to upload as the contact's profile photo. */
  file?: InputMaybe<VaporFileUpload>;
  /** Unique identifier of the contact. */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** The new name of the contact. */
  name?: InputMaybe<Scalars['String']['input']>;
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
  includeIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Queries for retrieving Core Devices. */
export type CoreDeviceQueriesSingleArgs = {
  hostname?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Enum representing different types of Core Devices, such as server, workstation, printer, laptop, or other. */
export enum CoreDeviceTypes {
  LAPTOP = 'laptop',
  OTHER = 'other',
  PRINTER = 'printer',
  SERVER = 'server',
  WORKSTATION = 'workstation'
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

/** A Location stores information about the real-world location of things. */
export type CoreLocation = {
  __typename?: 'CoreLocation';
  /** The street address of the location. */
  address?: Maybe<Scalars['String']['output']>;
  /** The attachments associated with the location. */
  attachments: Array<Maybe<CoreAttachment>>;
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
  /** The name of the location. */
  name: Scalars['String']['input'];
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
  type?: InputMaybe<Scalars['String']['input']>;
};


/** Queries for retrieving Core Locations. */
export type CoreLocationQueriesSingleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Enum representing different types of Core Locations, such as building, room, rack, or other. */
export enum CoreLocationTypes {
  BUILDING = 'building',
  OTHER = 'other',
  RACK = 'rack',
  ROOM = 'room'
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
  /** Unique identifier of the location. */
  id: Scalars['ID']['input'];
  /** The new name of the location. */
  name?: InputMaybe<Scalars['String']['input']>;
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
  /** Unique identifier of the location, if updating an existing location. */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** The name of the location. */
  name: Scalars['String']['input'];
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
  audits: AuditQueries;
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
  /** Update an existing team. */
  update?: Maybe<Team>;
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

export type ForgotPasswordMutationVariables = Exact<{
  input: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', auth: { __typename?: 'AuthMutations', forgotPassword: { __typename?: 'ForgotPasswordResponse', status: string, message?: string | null } } };

export type LoginMutationVariables = Exact<{
  input?: InputMaybe<LoginInput>;
}>;


export type LoginMutation = { __typename?: 'Mutation', auth: { __typename?: 'AuthMutations', login: { __typename?: 'AuthPayload', access_token?: string | null, refresh_token?: string | null, expires_in?: number | null, token_type?: string | null, user?: { __typename?: 'CurrentUser', id: string, email: string, name: string, photo?: string | null, created_at: Date, updated_at: Date, personal_team: { __typename?: 'Team', id: string, name: string, photo?: string | null }, teams?: Array<{ __typename?: 'Team', id: string, name: string, photo?: string | null }> | null } | null } } };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', auth: { __typename?: 'AuthMutations', register: { __typename?: 'RegisterResponse', status: RegisterStatuses, tokens?: { __typename?: 'AuthPayload', access_token?: string | null, refresh_token?: string | null, expires_in?: number | null, token_type?: string | null, user?: { __typename?: 'CurrentUser', id: string, name: string, photo?: string | null, email: string, email_verified_at?: Date | null, personal_team: { __typename?: 'Team', id: string, name: string, photo?: string | null }, teams?: Array<{ __typename?: 'Team', id: string, name: string, photo?: string | null }> | null } | null } | null } } };

export type UpdateForgottenPasswordMutationVariables = Exact<{
  input: NewPasswordWithCodeInput;
}>;


export type UpdateForgottenPasswordMutation = { __typename?: 'Mutation', auth: { __typename?: 'AuthMutations', updateForgottenPassword: { __typename?: 'ForgotPasswordResponse', status: string, message?: string | null } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', auth: { __typename?: 'AuthMutations', logout: { __typename?: 'LogoutResponse', status: string, message?: string | null } } };


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