declare namespace SYSTEM {

  type OptionalResult<T> = {
    respCode?: number;
    respMsg?: string;
    data?: T;
  };



  type HeaderProps = {
    id: string;
    key: string;
    isMobile: boolean;
  }
}