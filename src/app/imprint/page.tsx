import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
  },
};

export default function ImprintPage() {
  return (
    <main className="container mx-auto grid gap-6 px-4 py-8">
      <h1 className="text-3xl font-bold">Imprint</h1>

      <div className="mb-6">
        <div className="">
          <p className="paragraph-5">
            T4 Capital AG
            <br />
            Stutzstrasse 7
            <br />
            CH-8834 Schindellegi
          </p>
          <a href="mailto:info@t4-capital.ch">info@t4-capital.ch</a>
        </div>
        <br />
        <p>Entry detail amendments in register of commerce follows shortly.</p>
        <br />
        <p>
          The copyright for all contents of this website is held by T4 Capital
          AG.
        </p>
      </div>

      <div className="grid gap-3">
        <h2 className="text-2xl font-semibold">DISCLAIMER</h2>

        <p>
          By accessing our website, you declare that you have understood the
          Conditions of Use and accept them in full. If you disagree with or do
          not understand one or more of the provisions in the present Conditions
          of Use, kindly leave our website.
        </p>
        <p>
          Access to our website is not permitted to people who, especially on
          account of their nationality and/or place of residence, are subject to
          legal regulations that prohibit the publication of the content of our
          website or access to our website (no matter what the reasons). People
          to whom this restriction applies are forbidden from accessing our
          website.
        </p>
        <p>
          The information and opinions published on our website do not
          constitute recommendations or encouragement, offers or invitations to
          (i) purchase or sell investment vehicles; (ii) conduct such
          transactions; or (iii) conclude other legal business. They are
          exclusively for information and advertising purposes.
        </p>
        <p>
          The information and opinions published on our website do not serve as
          investment advice, nor do they constitute advice on legal, fiscal,
          business or other matters in any way. They are unsuitable as the basis
          for decision-making. Please seek advice from specialized experts
          before deciding on any specific course of action. The presentation of
          content over the Internet and the consultation thereof do not
          establish any legal relationship whatsoever between the provider and
          the user.
        </p>
        <p>
          We take utmost care in preparing the content of this website. The
          content on our website is constantly updated and checked for
          correctness. Nevertheless, we offer no guarantees (whether explicit or
          tacit) and make no promises about whether the content published on our
          website is correct, accurate, up-to-date or complete.
        </p>
        <p>
          Furthermore, we accept no responsibility and offer no guarantees that
          the functions on our website will not be interrupted or error-free,
          that faults will be repaired or that the servers from which the
          content can be obtained are free of viruses, Trojans, worms, software
          bombs or other harmful components or programs.
        </p>
        <p>
          In general, the past performance of an investment vehicle cannot in
          principle be used to draw any conclusions about the performance
          thereof in the future. All the data provided through this website,
          including financial market data, exchange-rate information, reports,
          research and other financial information, comes from sources that are
          carefully chosen and considered reliable. All available information is
          provided to users without guarantees about its accuracy and without
          explicit or tacit guarantees or warranties with regard to quality,
          originality, copyright-infringement or its suitability for a specific
          purpose.
        </p>
        <p>
          All the elements on our website are protected by intellectual property
          rights and are the property of us or third parties. Downloading or
          printing elements of our website shall not transfer any rights
          thereto, in particular rights with regard to software or brands.
          Copyright and trademark notices may be neither changed nor removed.
          Reproduction of parts of or complete elements of our website, no
          matter what form this may take (especially electronically or printed),
          is permissible only if accompanied by complete references to the
          source and with our prior consent.
        </p>
        <p>
          Users who click on links (hyperlinks) may be taken away from our
          website to the websites of other providers (“external links”) and
          their content. We provide links to third-party websites on our website
          in addition to our own content purely for reasons of user-friendliness
          and information. We have no control over the content of such
          third-party websites and accept no responsibility for the correctness,
          completeness, verity or actuality thereof or its suitability for
          specific purposes. We accept no liability whatsoever, particularly for
          possible direct or indirect damage or the consequences of using the
          content of third-party websites. We have no influence over the content
          of linked pages and therefore, despite taking great care in its
          choice, accepts no liability for the content of external links,
          particularly those that are changed after the link was established.
        </p>
        <p>
          We reserve the right to change these Conditions of Use from time to
          time. You are therefore requested to read these Conditions of Use
          whenever you access our website and determine whether you still accept
          the updated version thereof. If you disagree with or do not understand
          one or more of the updated Conditions of Use, leave our website.
        </p>
        <p>
          The aforementioned disclaimers shall be considered an integral part of
          the website that links to this page. If any parts hereof or individual
          expressions herein do not, no longer or do not fully comply with the
          applicable legal framework, the content and validity of the remaining
          parts of this document will remain unaffected by this.
        </p>
        <p>
          For all customers, access to and use of this website as well as the
          Conditions of Use are subject to Swiss law. The place of jurisdiction
          is Zurich.
        </p>
      </div>

      <div className="grid gap-3">
        <h2 className="text-2xl font-semibold">Data Policy</h2>

        <p>
          This Privacy Policy provides information about how we obtain and
          process personal data.
        </p>
        <p>
          “Personal data” means all information relating to an identified or
          identifiable natural person. “Processing” means any handling of
          personal data, irrespective of the means and procedures applied, in
          particular the collection, storage, retention, use, revision,
          disclosure, archiving, deletion or destruction of personal data.
        </p>
        <p>
          It is possible that any other documents, such as conditions of
          participation or similar declarations, regulate specific data
          processing.
        </p>
        <p>
          If the data subject provides the Partner or Joint Controller with
          personal data of other persons (e.g. family members, work colleagues
          or employees), the data subject must ensure that these persons are
          aware of this Privacy Policy. Their personal data may only be
          disclosed to the Partner or Joint Controller if the data subject is
          authorised to do so and the personal data is correct.
        </p>

        <p>
          You may contact the following company for data protection concerns:
        </p>
        <div>
          <p className="paragraph-5">
            T4 Capital AG
            <br />
            Stutzstrasse 7
            <br />
            CH-8834 Schindellegi
          </p>
          <a href="mailto:info@t4-capital.ch">info@t4-capital.ch</a>
        </div>

        <p>
          We primarily obtain and process personal data that is provided to us
          by the data subject, e.g. when opening a business relationship, in the
          context of the execution of contracts, the use of products and
          services or on websites or other applications.
        </p>
        <p>
          We process various categories of personal data. The most important
          categories are:
        </p>
        <ul className="list-outside list-disc pl-4">
          <li>
            Master and inventory data (e.g. name, address, nationality, date of
            birth, information regarding account, custody account, concluded
            transactions and contracts, information on third parties affected by
            data processing, such as spouses, authorised representatives and
            advisors).
          </li>
          <li>
            Technical data (e.g. business numbers, IP addresses, internal and
            external identifiers, records of access).
          </li>
          <li>User and prospect data (e.g. users of the Partner’s websites)</li>
          <li>
            Communication data (e.g. contact data such as email address,
            telephone number)
          </li>
          <li>Other data (e.g. video or audio recordings, access data)</li>
        </ul>

        <p />
        <p>
          We processes personal data primarily to provide own services, to
          process contracts with clients and business partners and to comply
          with legal obligations.
        </p>
        <p>
          Insofar as consent has been given to process personal data for
          specific purposes (e.g. when registering for a newsletter), the
          personal data will be processed within the scope of and based on this
          consent, insofar as no other legal basis is given and necessary.
          Consent given can be revoked at any time, but this does not affect
          data processing that has already taken place.
        </p>
        <p>
          The Partner undertakes to protect personal data for the data
          processing’s for which it is responsible in accordance with the
          applicable laws. The protection of personal data includes appropriate
          technical and organisational security measures (e.g. access
          restrictions, firewalls, personalised passwords as well as encryption
          and authentication technologies, training of employees, etc.).
        </p>
        <p>
          Recipients of personal data are usually in Switzerland. Particularly
          when using certain services, personal data may also be disclosed to
          third parties outside of Switzerland (e.g. Europe or the USA). Where a
          recipient is located in a country without an adequate level of data
          protection, we contractually oblige the recipient to comply with the
          applicable data protection unless the recipient is already subject to
          a legally recognized set of rules to ensure data protection or the
          Joint Controller cannot rely on an exemption provision.
        </p>
        <p>
          When you visits our website, the web server automatically records
          details of the visit (e.g. the website from which the visit takes
          place, the visitor’s IP address, the content of the website that is
          accessed, including the date and duration of the visit). Such tracking
          data is used to optimise the websites visited and provide information
          on how the visitor informs himself about and uses the products,
          services and offers. As a rule, however, it does not allow any
          conclusions to be drawn about the identity of the visitor. In this
          respect, no personal data is processed.
        </p>
        <p>
          However, if the visitor provides personal data, e.g. by filling in a
          registration form or message field for newsletters etc., we may use
          this data in particular for the following, in addition to the purposes
          set out in section 5:
        </p>
        <ul className="list-outside list-disc pl-4">
          <li>for customer and user administration;</li>
          <li>to inform the visitor about services and products;</li>
          <li>for marketing purposes (e.g. sending newsletters);</li>
          <li>
            for the technical “hosting” and further development of the websites.
          </li>
        </ul>

        <p>
          When visiting the websites, the visitor’s data is transported via the
          internet, i.e. an open network accessible to everyone. Data
          transmitted via electronic media (including e-mail) cannot be
          effectively protected against access by third parties. This entails
          the risk that data may be disclosed or its content changed, that the
          identity of the sender (e.g. e-mail) as well as the content of the
          message is faked or manipulated in some other way by unauthorised
          persons, that viruses may be released, that technical transmission
          errors, delays or interruptions may occur, that data may be
          transmitted uncontrolled abroad, where data protection requirements
          may be lower than in Switzerland, etc. The risk of such manipulation
          may also arise.
        </p>
        <p>
          By using the website, visitors confirm their express agreement with
          this Privacy Policy and the risks mentioned. The duration of the
          storage of personal data depends on the purpose of the respective data
          processing and/or legal retention and documentation obligations, which
          amount to five, ten or more years depending on the applicable legal
          basis. As soon as the personal data is no longer required for the
          above-mentioned purposes, it is deleted or made anonymous as far as
          possible.
        </p>
        <p>
          Anyone can request information from us as to whether personal data
          about him/ her is being processed. There is a right of objection or
          restriction of processing and, where applicable, the right to data
          portability. Incorrect data can be corrected. Furthermore, the
          deletion of personal data can be requested, unless legal or regulatory
          obligations (e.g. legal retention obligations of business-relevant
          data) or technical hurdles prevent this. The deletion of data may have
          the consequence that certain services can no longer be provided. In
          addition, where applicable, there is a right of appeal to a competent
          authority. Where we process personal data on the basis of consent,
          this consent may be revoked at any time. In order to respond to your
          request, we ask for a corresponding, comprehensible message. We will
          review and respond to the concerns within a reasonable period.
        </p>
        <p>
          We may amend this data protection declaration at any time without
          prior notice.
        </p>
      </div>
    </main>
  );
}
