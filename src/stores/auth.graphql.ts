import gql from "graphql-tag";


export const FORGOT_PASSWORD_QUERY = gql`
  mutation forgotPassword($input: ForgotPasswordInput!) {
    auth {
      forgotPassword(input: $input) {
        status
        message
      }
    }
  }
`;

export const LOGIN_QUERY = gql`
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

export const REGISTER_QUERY = gql`
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

export const FORGOT_RESET_PASSWORD_QUERY = gql`
  mutation updateForgottenPassword($input: NewPasswordWithCodeInput!) {
    auth {
      updateForgottenPassword(input: $input) {
        status
        message
      }
    }
  }
`;

export const LOGOUT_QUERY = gql`
  mutation logout {
    auth {
      logout {
        status
        message
      }
    }
  }
`;
