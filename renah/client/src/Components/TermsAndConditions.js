import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import classes from "./TermsAndConditions.module.css";

const TermsAndConditions = () => {
    return (
        <div className="">
            <Navbar />
            <div className={classes.outerWrapper}>
                <div className={classes.wrapper}>
                    <h1 className={classes.mainHeading}>TERMS AND CONDITIONS</h1>
            
                    <h2 className={classes.subHeading}>Introduction</h2>
                    <p className={classes.textBody}>
                        Niplofy Services operates an ecommerce platform consisting of a website ("community"),
                        together with supporting logistics and payment infrastructure, for the sale and purchase
                        of consumer products in Nigeria.
                    </p>
                    <h2 className={classes.subHeading}>Membership Eligiblity</h2>
                    <p className={classes.textBody}>
                        The use of NIplofy Website is available only anyone who can form legally binding Goods and
                         Services under Nigerian Governing Laws. If you’re under the Age of 18, you’re not to register
                         as a member of the Niplofy community and you’re also not allowed to use the Niplofy Website.
                         But if as a Minor you wish to transact (Buy or Sell), Such transaction must be made by your
                         Parents or by your legal Guardian who have been registered as users of Niplofy. Niplofy is
                         of Full capability to terminate your membership if it is discovered that that you’re under
                         the age of 18 years.
                    </p>
                    <h2 className={classes.subHeading}>Account and Registration </h2>
                    <p className={classes.textBody}>
                        <ol>
                            <li>
                                If you use Niplofy, You’d be responsible for maintaining confidentiality of
                                your Email Address Or User Identification and your Password.
                            </li>
                            <li>
                                If you register for an account with our community, you will be asked to provide
                                an email address/user ID and password and you agree to be responsible for any
                                activity on our marketplace arising out of any failure to keep your password
                                confidential, and that you may be held liable for any losses arising out of
                                such a failure.
                            </li>
                            <li>
                                Your account will be only used by you and it is advisable to not transfer your
                                account to any third party. If you authorize any third party to manage your
                                account on your behalf, it will be at your own risk.
                            </li>
                            <li>
                                You agree to immediately notify us of any unauthorized use, or suspected unauthorized
                                use of your Account or any other breach of security. We will not be responsible for
                                any for Any loss of Damage arising for failure to provide the above requirements.
                            </li>
                        </ol>
                    </p>
                    <h2 className={classes.subHeading}>Privacy</h2>
                    <p className={classes.textBody}>
                        Protection of your privacy is a very important principle. It is understood that you and your
                        personal Information is one of our most important assets, Your Information is stored on
                        computers that may be protected by technological and physical measures.
                    </p>
                    <h2 className={classes.subHeading}>Breaches of General Terms and Conditions</h2>
                    <p className={classes.textBody}>
                       <ol>
                           <li>
                                If we permit the registration of an account on our community it will remain open,
                                subject to these general terms and conditions.
                           </li>
                           <li>
                                If you breach these general terms and conditions, or if we suspect that you have
                                breached these general terms and conditions or any policies or guidelines in
                                any way we may:
                                <ul>
                                    <li>
                                        Suspend your access to our community Temporarily.
                                    </li>
                                    <li>
                                        Terminate your access to our community Permanently.
                                    </li>
                                    <li>
                                        Block all computers using your IP address from accessing our community.
                                    </li>
                                    <li>
                                        contact any or all of your internet service providers and request that
                                        they block your access to our community.
                                    </li>
                                    <li>
                                        Suspend or delete your account on our community.
                                    </li>
                                    <li>
                                        Commence legal action against you, whether for breach of contract or otherwise.
                                    </li>
                                </ul>
                           </li>
                           <li>
                                Where we suspend, prohibit or block your access to our marketplace or a part of our
                                marketplace you must not take any action to circumvent such suspension or prohibition
                                or blocking (including without limitation creating and/or using a different account).
                           </li>
                       </ol>
                    </p>
                    <h2 className={classes.subHeading}>Cookies</h2>
                    <p className={classes.textBody}>
                        We employ the use of cookies. By accessing Niplofy.com, you agreed to use cookies in agreement
                        with the Niplofy's Privacy Policy.
            
                        Most interactive websites use cookies to let us retrieve the user’s details for each visit.
                        Cookies are used by our website to enable the functionality of certain areas to make it easier
                        for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
                    </p>
                    <h2 className={classes.subHeading}>Reservation Of Rights</h2>
                    <p className={classes.textBody}>
                        We reserve the right to request that you remove all links or any particular link to our Website.
                        You approve to immediately remove all links to our Website upon request. We also reserve the
                        right to amen these terms and conditions and it’s linking policy at any time. By continuously
                        linking to our website, you agree to be bound to follow these linking terms and conditions.
                    </p>
                    <h2 className={classes.subHeading}>Disclaimer</h2>
                    <p className={classes.textBody}>
                        To the maximum extent permitted by applicable law, we exclude all representations, warranties
                        and conditions relating to our website and use of this website. Nothing in this disclaimer will:
                        <ul>
                            <li>
                                Limit or exclude our or your liability for death or personal injury.
                            </li>
                            <li>
                                Limit or exclude our or your liability for fraud of fraudulent misrepresentation.
                            </li>
                            <li>
                                Limit and of our or your liabilities in any way that is not permitted under applicable
                                law or exclude any of our or your liabilities that may not be excluded under applicable law.
                            </li>
                        </ul>
                    </p>
                    <p className={classes.textBoby}>
                        The limitations and prohibitions of liability set in this section and elsewhere in this disclaimer:
                        <ul>
                            <li>
                                Are subject to the preceding paragraph; and
                            </li>
                            <li>
                                Govern all liabilities arising under the disclaimer, including liabilities arising
                                in contract, in tort and for beach of statutory duty.
                            </li>
                        </ul>
                    </p>
                    <p className={classes.textBoby}>
                        As long as the Website and the information and services on the website are provided free of
                        charge, we will not be liable for any loss or damage of any nature.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default TermsAndConditions