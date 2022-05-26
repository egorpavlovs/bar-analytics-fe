import React from 'react';
import Router from 'next/router';

import { withApolloClient } from 'lib/withApolloClient';
import WithAuth from 'lib/auth/withAuth';

import { HOME } from 'config/routes';
import { NotifierProvider } from 'contexts/NotifierContext';

import DefaultTemplate from 'components/shared/templates/DefaultTemplate';
import Notifier from 'components/shared/atoms/Notifier';

import PublicCateringCard from './components/PublicCateringCard';

const SignInPage = () => {
  return (
    <NotifierProvider>
      <DefaultTemplate testId="public-catering-index">
        <PublicCateringCard />
        <Notifier />
      </DefaultTemplate>
    </NotifierProvider>
  );
};

SignInPage.getInitialProps = ({ res, accessTokenManager }) => {
  if (accessTokenManager.accessToken) {
    if (res) {
      res.redirect(302, HOME);
    } else {
      Router.push(HOME);
    }
  }
  return {};
};

export default withApolloClient(WithAuth(SignInPage));
