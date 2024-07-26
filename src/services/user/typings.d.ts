declare namespace USER {
  type LoginUser= {
    username: string;
    password: string;
    email:string;
    captcha:string;
    loginType:string;
  }

  type LoginResult= {
    access_token?: string;
    token_type?: string;
    refresh_token?: string;
    expires_in?: number;
    scope?: string;
    account_type?: string;
  }

  type User = {
    id?: number;
    username?: string;
    nickname?: string;
    headImgUrl?: string;
    sex?: number;
    type?: string;
    mobile?: string;
    createTime?: Date;
    enabled?: boolean;
    del?: boolean;
    roles?: Role[];
    roleId?: string;
  };

}