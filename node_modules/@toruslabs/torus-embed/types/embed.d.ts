import Web3 from 'web3'

/**
 * Torus class
 */
declare class Torus {
  /**
   * Creates a new instance of Torus class
   * @param args Constructor arguments used to initialize torus constructor
   */
  constructor(args: TorusCtorArgs)
  /**
   * web3 0.20.7 instance. {@link https://github.com/ethereum/wiki/wiki/JavaScript-API | Documentation}
   */
  web3: Web3
  /**
   * Ethereum provider instance
   */
  provider: Provider
  /**
   * Proxy for Ethereum provider instance
   */
  ethereum: Provider
  /**
   * Returns the logged in verifier of the user
   */
  currentVerifier: string
  /**
   * Gets the public address associated with a verifier & veriferId
   * @param verifierArgs Args of a verifer
   */
  getPublicAddress(verifierArgs: VerifierArgs): Promise<string | TorusPublicKey>
  /**
   * Changes the current network to the specified one. Opens a popup requesting user confirmation
   * @param networkParams Params used to initialize a network
   */
  setProvider(networkParams: NetworkInterface): Promise<void>
  /**
   * Opens a popup showing torus wallet
   * @param path path of torus website to show
   * @param params Additional query params to add to url
   */
  showWallet(path: WALLET_PATH, params?: object): void
  /**
   * Exposes the topup api of torus
   *
   * Allows the dapp to trigger a payment method directly
   *
   * If no params are provided, it defaults to { selectedAddress? = 'TORUS' fiatValue = MIN_FOR_PROVIDER;
   * selectedCurrency? = 'USD'; selectedCryptoCurrency? = 'ETH'; }
   *
   * Initiates the topup flow of torus for the provider. Opens a popup of the specified provider
   * @param provider Name of the provider
   * @param params Optional params to pre-fill in provider's site
   */
  initiateTopup(provider: PAYMENT_PROVIDER, params?: PaymentParams): Promise<boolean>
  /**
   * Shows Torus widget
   */
  showTorusButton(): void
  /**
   * Hides torus widget
   */
  hideTorusButton(): void
  /**
   * Gets the user info. Opens a popup requesting user confirmation (once per session)
   * @param message
   */
  getUserInfo(message: string): Promise<UserInfo>
  /**
   * Initializes torus client. To be called first before any other methods
   * @param params Optional params for initialization
   */
  init(params: TorusParams): Promise<void>
  /**
   * Logs the user in. Helper for ethereum.enable or provider.enable
   * @param params Additional params to be passed in for logging in
   */
  login(params: LoginParams): Promise<string[]>
  /**
   * Logs the user out of torus. Prefer cleanUp
   */
  logout(): Promise<void>
  /**
   * Logs the user out first. Cleans up torus iframe and other assets. Removes torus instance completely
   */
  cleanUp(): Promise<void>
}

export as namespace Torus

export = Torus

declare class Provider {
  send(payload: JsonRPCRequest, callback: Callback<JsonRPCResponse>): any
}

type WALLET_PATH = 'transfer' | 'topup' | 'home' | 'settings' | 'history'
type ETHEREUM_NETWORK_TYPE = 'ropsten' | 'rinkeby' | 'kovan' | 'mainnet' | 'goerli' | 'localhost' | 'matic' | 'mumbai'
type PAYMENT_PROVIDER = 'moonpay' | 'wyre' | 'rampnetwork' | 'xanpool' | ''

type LOGIN_TYPE =
  | 'google'
  | 'facebook'
  | 'reddit'
  | 'discord'
  | 'twitch'
  | 'apple'
  | 'github'
  | 'linkedin'
  | 'twitter'
  | 'weibo'
  | 'line'
  | 'jwt'
  | 'email-password'
  | 'passwordless'

interface LoginConfig {
  /**
   * Use the verifier provided by torus as a key or a default verifier used by torus 
   * {@link https://docs.tor.us/torus-wallet/developing-with-torus-wallet/oauth | Documentation} 
   */
  [verifier: string]: LoginConfigItem
}

interface LoginConfigItem {
  /**
   * Display Name. If not provided, we use the default for torus app
   */
  name?: string
  /**
   * The type of login. Refer to enum `LOGIN_TYPE`
   */
  typeOfLogin: LOGIN_TYPE
  /**
   * Description for button. If provided, it renders as a full length button. else, icon button
   */
  description?: string
  /**
   * Custom client_id. If not provided, we use the default for torus app
   */
  clientId?: string
  /**
   * Logo to be shown on mouse hover. If not provided, we use the default for torus app
   */
  logoHover?: string
  /**
   * Logo to be shown on dark background (dark theme). If not provided, we use the default for torus app
   */
  logoLight?: string
  /**
   * Logo to be shown on light background (light theme). If not provided, we use the default for torus app
   */
  logoDark?: string
  /**
   * Whether to show the login button on modal or not
   */
  showOnModal?: boolean
  /**
   * Custom jwt parameters to configure the login. Useful for Auth0 configuration
   */
  jwtParameters?: JwtParameters
}

interface TorusPublicKey extends TorusNodePub {
  /**
   * Ethereum Public Address
   */
  address: string
}

interface TorusNodePub {
  /**
   * X component of a Public Key
   */
  X: string
  /**
   * Y component of a Public Key
   */
  Y: string
}

interface PaymentParams {
  /**
   * Address to send the funds to
   */
  selectedAddress?: string
  /**
   * Default fiat currency for the user to make the payment in
   */
  selectedCurrency?: string
  /**
   * Amount to buy in the selectedCurrency
   */
  fiatValue?: number
  /**
   * Cryptocurrency to buy
   */
  selectedCryptoCurrency?: string
}

interface VerifierArgs {
  /**
   * Verifier Enum
   */
  verifier: 'google' | 'reddit' | 'discord'
  /**
   * email for google
   *
   * username for reddit
   *
   * id for discord
   */
  verifierId: string
  /**
   * If true, returns {@link TorusPublicKey}, else returns string
   */
  isExtended?: boolean
}

interface LoginParams {
  verifier?: string
}

interface TorusCtorArgs {
  /**
   * Determines where the torus widget is visible on the page.
   * @default bottom-left
   */
  buttonPosition?: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left'

  /**
   * Z-index of the modal and iframe
   * @default 99999
   */
  modalZIndex?: number

  /**
   * Api key
   * Get yours today at {@link https://dashboard.tor.us | Dashboard}
   */
  apiKey?: string
}

interface UserInfo {
  /**
   * Email of the logged in user
   */
  email: string
  /**
   * Full name of the logged in user
   */
  name: string
  /**
   * Profile image of the logged in user
   */
  profileImage: string
  /**
   * verifier of the logged in user (google, facebook etc)
   */
  verifier: string
  /**
   * Verifier Id of the logged in user
   *
   * email for google,
   * id for facebook,
   * username for reddit,
   * id for twitch,
   * id for discord
   */
  verifierId: string
}

interface TorusParams {
  /**
   * Torus Network Object
   */
  network?: NetworkInterface
  /**
   * Build Environment of Torus.
   *
   * production uses https://app.tor.us,
   *
   * development uses https://localhost:3000 (expects torus-website to be run locally),
   *
   * staging uses https://staging.tor.us,
   * 
   * lrc uses https://lrc.tor.us,
   *
   * testing uses https://testing.tor.us (latest internal build)
   * @default production
   */
  buildEnv?: 'production' | 'development' | 'staging' | 'testing' | 'lrc'
  /**
   * Enables or disables logging.
   *
   * Defaults to false in prod and true in other environments
   */
  enableLogging?: boolean
  /**
   * whether to show/hide torus widget.
   *
   * Defaults to true
   * @default true
   */
  showTorusButton?: boolean
  /**
   * setting false, hides those verifiers from login modal   
   * @deprecated
   * Please use loginConfig instead
   */
  enabledVerifiers?: VerifierStatus
  /**
   * Array of login config items. Used to modify the default logins/ add new logins
   */
  loginConfig?: LoginConfig
  /**
   * Params to enable integrity checks and load specific versions of torus-website
   */
  integrity?: IntegrityParams
  /**
   * Params to enable whitelabelling of torus website and widget
   */
  whiteLabel?: WhiteLabelParams
}

interface WhiteLabelParams {
  /**
   * Whitelabel theme
   */
  theme: ThemeParams
  /**
   * Language of whitelabel.
   *
   * order of preference: Whitelabel language > user language (in torus-website) > browser language
   */
  defaultLanguage?: string
  /**
   * Logo Url to be used in light mode (dark logo)
   */
  logoDark: string
  /**
   * Logo Url to be used in dark mode (light logo)
   */
  logoLight: string
  /**
   * Shows/hides topup option in torus-website/widget.
   * Defaults to false
   * @default false
   */
  topupHide?: boolean
  /**
   * Shows/hides billboard in torus-website.
   * Defaults to false
   * @default false
   */
  featuredBillboardHide?: boolean
  /**
   * Shows/hides disclaimers on login page. Only works if special logins are hidden
   * Defaults to false
   * @default false
   */
  disclaimerHide?: boolean
  /**
   * Language specific link for terms and conditions on torus-website. See (examples/vue-app) to configure
   */
  tncLink?: LocaleLinks<string>
  /**
   * Language specific link for privacy policy on torus-website. See (examples/vue-app) to configure
   */
  privacyPolicy?: LocaleLinks<string>
  /**
   * Language specific link for privacy policy on torus-website. See (examples/vue-app) to configure
   */
  contactLink?: LocaleLinks<string>
  /**
   * Custom translations. See (examples/vue-app) to configure
   */
  customTranslations?: LocaleLinks<any>
}

interface LocaleLinks<T> {
  /**
   * Item corresponding to english
   */
  en?: T;
  /**
   * Item corresponding to japanese
   */
  ja?: T;
  /**
   * Item corresponding to korean
   */
  ko?: T;
  /**
   * Item corresponding to german
   */
  de?: T;
  /**
   * Item corresponding to chinese (simplified)
   */
  zh?: T;
}

interface ThemeParams {
  /**
   * If true, enables dark mode
   * Defaults to false
   * @default false
   */
  isDark: boolean
  /**
   * Colors object to customize colors in torus theme.
   *
   * Contact us for whitelabel. Example provided in `examples/vue-app`
   */
  colors: any
}

interface IntegrityParams {
  /**
   * Whether to check for integrity.
   * Defaults to false
   * @default false
   */
  check: boolean
  /**
   * if check is true, hash must be provided. The SRI sha-384 integrity hash
   * {@link https://www.srihash.org/ | SRI Hash}
   */
  hash?: string
  /**
   * Version of torus-website to load
   */
  version?: string
}

interface VerifierStatus {
  /**
   * Defaults to true
   * @default true
   */
  google?: boolean
  /**
   * Defaults to true
   * @default true
   */
  facebook?: boolean
  /**
   * Defaults to true
   * @default true
   */
  reddit?: boolean
  /**
   * Defaults to true
   * @default true
   */
  twitch?: boolean
  /**
   * Defaults to true
   * @default true
   */
  discord?: boolean
}

interface NetworkInterface {
  /**
   * If any network other than the ones in enum, it should a JSON RPC URL
   */
  host: ETHEREUM_NETWORK_TYPE | string
  /**
   * chainId for the network. If not provided, we query the host
   */
  chainId?: number
  /**
   * Name of the network
   */
  networkName?: string
}

interface JsonRPCResponse {
  jsonrpc: string
  id: number
  result?: any
  error?: string
}

interface JsonRPCRequest {
  jsonrpc: string
  method: string
  params: any[]
  id: number
}

interface Callback<ResultType> {
  (error: Error): void
  (error: null, val: ResultType): void
}

interface BaseLoginOptions {
  /**
   * - `'page'`: displays the UI with a full page view
   * - `'popup'`: displays the UI with a popup window
   * - `'touch'`: displays the UI in a way that leverages a touch interface
   * - `'wap'`: displays the UI with a "feature phone" type interface
   */
  display?: "page" | "popup" | "touch" | "wap";
  /**
   * - `'none'`: do not prompt user for login or consent on reauthentication
   * - `'login'`: prompt user for reauthentication
   * - `'consent'`: prompt user for consent before processing request
   * - `'select_account'`: prompt user to select an account
   */
  prompt?: "none" | "login" | "consent" | "select_account";
  /**
   * Maximum allowable elasped time (in seconds) since authentication.
   * If the last time the user authenticated is greater than this value,
   * the user must be reauthenticated.
   */
  max_age?: string | number;
  /**
   * The space-separated list of language tags, ordered by preference.
   * For example: `'fr-CA fr en'`.
   */
  ui_locales?: string;
  /**
   * Previously issued ID Token.
   */
  id_token_hint?: string;
  /**
   * The user's email address or other identifier. When your app knows
   * which user is trying to authenticate, you can provide this parameter
   * to pre-fill the email box or select the right session for sign-in.
   *
   * This currently only affects the classic Lock experience.
   */
  login_hint?: string;
  acr_values?: string;
  /**
   * The default scope to be used on authentication requests.
   * The defaultScope defined in the Auth0Client is included
   * along with this scope
   */
  scope?: string;
  /**
   * The default audience to be used for requesting API access.
   */
  audience?: string;
  /**
   * The name of the connection configured for your application.
   * If null, it will redirect to the Auth0 Login Page and show
   * the Login Widget.
   */
  connection?: string;

  /**
   * If you need to send custom parameters to the Authorization Server,
   * make sure to use the original parameter name.
   */
  [key: string]: unknown;
}

interface JwtParameters extends BaseLoginOptions {
  /**
   * Your Auth0 account domain such as `'example.auth0.com'`,
   * `'example.eu.auth0.com'` or , `'example.mycompany.com'`
   * (when using [custom domains](https://auth0.com/docs/custom-domains))
   */
  domain: string;
  /**
   * The Client ID found on your Application settings page
   */
  client_id?: string;
  /**
   * The default URL where Auth0 will redirect your browser to with
   * the authentication result. It must be whitelisted in
   * the "Allowed Callback URLs" field in your Auth0 Application's
   * settings. If not provided here, it should be provided in the other
   * methods that provide authentication.
   */
  redirect_uri?: string;
  /**
   * The value in seconds used to account for clock skew in JWT expirations.
   * Typically, this value is no more than a minute or two at maximum.
   * Defaults to 60s.
   */
  leeway?: number;

  /**
   * The field in jwt token which maps to verifier id
   */
  verifierIdField?: string;

  /**
   * Whether the verifier id field is case sensitive
   * @default true
   */
  isVerifierIdCaseSensitive?: boolean;
}
