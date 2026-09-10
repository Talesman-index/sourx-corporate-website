# -*- coding: utf-8 -*-
import json
import re

privacy_terms_fr = {
    # Privacy policy full sections
    "privacy.s1_title": "1. Responsable du Traitement &amp; Présence Internationale",
    "privacy.s1_desc": "Le responsable du traitement des données personnelles est SOURX EMEA, cabinet multidisciplinaire de conseil opérant sous les juridictions britannique et espagnole :",
    "privacy.s1_hq_lbl": "Siège Royaume-Uni :",
    "privacy.s1_hq_val": "71-75 Shelton Street, Covent Garden, London WC2H 9JQ, United Kingdom",
    "privacy.s1_spain_lbl": "Pôle Espagne (EMEA) :",
    "privacy.s1_spain_val": "Castellón de la Plana, 12005 Espagne",
    "privacy.s1_phone_lbl": "Téléphone direct :",
    "privacy.s1_email_lbl": "Email officiel :",
    "privacy.s2_title": "2. Données Personnelles Collectées",
    "privacy.s2_desc": "Dans le cadre de nos activités de conseil de direction, nous ne collectons que les données strictement nécessaires aux finalités prévues :",
    "privacy.s2_item1": "<strong>Données d'identification :</strong> nom complet, fonction/titre professionnel, entreprise ou organisation représentée.",
    "privacy.s2_item2": "<strong>Coordonnées professionnelles :</strong> adresse email professionnelle, numéro de téléphone, adresse du siège social.",
    "privacy.s2_item3": "<strong>Informations relatives aux projets :</strong> description des enjeux stratégiques, objectifs de transformation digitale, contraintes de calendrier transmises volontairement via nos formulaires.",
    "privacy.s2_item4": "<strong>Données de navigation technique :</strong> adresse IP anonymisée, métriques de performance du site, préférences linguistiques (FR, EN, ES).",
    "privacy.s3_title": "3. Finalités &amp; Bases Juridiques du Traitement",
    "privacy.s3_desc": "Chaque traitement de données repose sur une base juridique licite conformément au RGPD (Règlement UE 2016/679) et au Data Protection Act 2018 (UK) :",
    "privacy.s3_item1": "<strong>Exécution de mesures précontractuelles ou contractuelles :</strong> traitement des demandes de consultation, contractualisation de missions de conseil, déploiement d'audits et d'architectures logicielles.",
    "privacy.s3_item2": "<strong>Intérêt légitime :</strong> gestion de la relation client B2B, sécurisation de notre plateforme technique, prévention des fraudes.",
    "privacy.s3_item3": "<strong>Consentement explicite :</strong> recueil de vos coordonnées pour l'envoi d'analyses stratégiques ou d'insights de notre Innovation Lab.",
    "privacy.s3_item4": "<strong>Obligations légales :</strong> respect des exigences comptables, fiscales et de conformité réglementaire (Royaume-Uni et Espagne).",
    "privacy.s4_title": "4. Confidentialité Stricte &amp; Non-Divulgation",
    "privacy.s4_desc": "En tant que cabinet de conseil de direction générale, SOURX applique une politique de confidentialité absolue. Vos données ne sont <strong>jamais vendues, louées ou commercialisées</strong> auprès de tiers. Elles ne sont accessibles qu'aux associés et consultants seniors soumis à un engagement strict de non-divulgation (NDA) et affectés à vos projets.",
    "privacy.s5_title": "5. Sécurité Technique &amp; Hébergement",
    "privacy.s5_desc": "Nous appliquons des standards de sécurité de niveau entreprise : chiffrement des données en transit (protocole TLS 1.3) et au repos (AES-256), segmentation des environnements d'infrastructure, et politiques de sauvegarde régulières. Nos infrastructures sont localisées au sein de centres de données souverains au Royaume-Uni et dans l'Union Européenne.",
    "privacy.s6_title": "6. Vos Droits d'Accès, de Rectification et d'Effacement",
    "privacy.s6_desc": "Conformément à la réglementation européenne et britannique, vous disposez des droits suivants concernant vos données à caractère personnel :",
    "privacy.s6_r1": "Droit d'accès et de communication de vos données personnelles.",
    "privacy.s6_r2": "Droit de rectification et de mise à jour des informations inexactes.",
    "privacy.s6_r3": "Droit à l'effacement (« droit à l'oubli ») lorsque les données ne sont plus nécessaires.",
    "privacy.s6_r4": "Droit à la limitation du traitement et droit d'opposition pour motifs légitimes.",
    "privacy.s6_r5": "Droit à la portabilité des données fournies.",
    "privacy.s6_contact": "Pour exercer ces droits, adressez votre demande par email à <a href=\"mailto:info@sourx.com\" style=\"color: #012e5c; font-weight: 600;\">info@sourx.com</a> ou par courrier postal à notre siège londonien : <em>SOURX EMEA, 71-75 Shelton Street, Covent Garden, London WC2H 9JQ</em>. Une réponse vous sera apportée sous 30 jours ouvrés.",
    "privacy.back_btn": "← Retour à l'Accueil",

    # Terms & Legal Notice full sections
    "terms.s1_title": "1. Éditeur de la Plateforme",
    "terms.s1_name_lbl": "Dénomination sociale :",
    "terms.s1_name_val": "SOURX EMEA Ltd",
    "terms.s1_hq_lbl": "Siège social Royaume-Uni :",
    "terms.s1_hq_val": "71-75 Shelton Street, Covent Garden, London WC2H 9JQ, United Kingdom",
    "terms.s1_spain_lbl": "Pôle opérationnel Espagne :",
    "terms.s1_spain_val": "Castellón de la Plana, 12005 Espagne",
    "terms.s1_phone_lbl": "Numéro de téléphone :",
    "terms.s1_email_lbl": "Email de contact officiel :",
    "terms.s1_pub_lbl": "Directeur de la publication :",
    "terms.s1_pub_val": "Direction Générale SOURX EMEA",
    "terms.s2_title": "2. Hébergement &amp; Infrastructure Technique",
    "terms.s2_desc": "La plateforme SOURX est hébergée sur des infrastructures cloud hautement sécurisées, résilientes et supervisées en continu 24h/24 et 7j/7, situées dans des centres de données certifiés ISO 27001, SOC 2 Type II et conformes au RGPD, garantissant une haute disponibilité et l'intégrité des flux de données.",
    "terms.s3_title": "3. Propriété Intellectuelle &amp; Droits Réservés",
    "terms.s3_p1": "L'ensemble des éléments constituant ce site internet (notamment mais non limitativement : l'identité visuelle de SOURX, logos, marques, textes, études de cas, graphismes, vidéos, algorithmes de scoring, code source et architecture logicielle) est la propriété exclusive de SOURX EMEA ou fait l'objet d'une licence légale d'exploitation.",
    "terms.s3_p2": "Toute reproduction, représentation, modification, publication ou adaptation totale ou partielle de ces éléments, quel que soit le moyen ou le procédé utilisé, est strictement interdite sans autorisation écrite préalable de la direction générale de SOURX EMEA.",
    "terms.s4_title": "4. Nature des Informations &amp; Limite de Responsabilité",
    "terms.s4_p1": "Les informations et analyses diffusées sur ce site sont présentées à titre informatif et indicatif. Elles ne constituent en aucun cas un engagement contractuel ni une consultation juridique, fiscale ou financière formelle.",
    "terms.s4_p2": "Toute mission de conseil, d'audit ou de transformation technologique fait l'objet d'une lettre de mission ou d'un contrat de prestation de services spécifique (Master Services Agreement), détaillant précisément les objectifs, obligations et responsabilités des parties.",
    "terms.s5_title": "5. Droit Applicable &amp; Juridiction Compétente",
    "terms.s5_desc": "Les présentes mentions légales sont régies par le droit anglais et les règlements applicables de l'Union Européenne. Tout litige relatif à l'interprétation, l'exécution ou la validité des présentes conditions sera soumis à la compétence exclusive des tribunaux de Londres, Royaume-Uni, sans préjudice des règles d'ordre public applicables.",
    "terms.s6_title": "6. Contact &amp; Questions Juridiques",
    "terms.s6_desc": "Pour toute question relative aux présentes mentions légales ou à la conformité de nos opérations, veuillez contacter notre direction juridique à l'adresse : <a href=\"mailto:info@sourx.com\" style=\"color: #012e5c; font-weight: 600;\">info@sourx.com</a>.",
    "terms.back_btn": "← Retour à l'Accueil"
}

privacy_terms_en = {
    # Privacy policy full sections
    "privacy.s1_title": "1. Data Controller &amp; International Presence",
    "privacy.s1_desc": "The data controller for personal data is SOURX EMEA, a multidisciplinary management advisory firm operating under British and Spanish jurisdictions:",
    "privacy.s1_hq_lbl": "UK Headquarters:",
    "privacy.s1_hq_val": "71-75 Shelton Street, Covent Garden, London WC2H 9JQ, United Kingdom",
    "privacy.s1_spain_lbl": "Spain Hub (EMEA):",
    "privacy.s1_spain_val": "Castellón de la Plana, 12005 Spain",
    "privacy.s1_phone_lbl": "Direct Telephone:",
    "privacy.s1_email_lbl": "Official Email:",
    "privacy.s2_title": "2. Personal Data Collected",
    "privacy.s2_desc": "Within our executive advisory operations, we only collect data strictly necessary for our declared business purposes:",
    "privacy.s2_item1": "<strong>Identification details:</strong> full name, corporate title/role, company or organization represented.",
    "privacy.s2_item2": "<strong>Professional contact info:</strong> corporate email address, phone number, registered corporate address.",
    "privacy.s2_item3": "<strong>Project information:</strong> strategic priorities, digital transformation goals, project timelines voluntarily submitted via our intake forms.",
    "privacy.s2_item4": "<strong>Technical browsing data:</strong> anonymized IP address, website performance metrics, language selection (FR, EN, ES).",
    "privacy.s3_title": "3. Purposes &amp; Legal Grounds for Processing",
    "privacy.s3_desc": "All data processing activities are based on lawful grounds pursuant to the GDPR (EU Regulation 2016/679) and the UK Data Protection Act 2018:",
    "privacy.s3_item1": "<strong>Contractual or pre-contractual measures:</strong> handling strategic consultation requests, preparing advisory proposals, deploying technical audits and software builds.",
    "privacy.s3_item2": "<strong>Legitimate business interests:</strong> managing enterprise B2B relationships, maintaining infrastructure security, preventing fraud.",
    "privacy.s3_item3": "<strong>Explicit consent:</strong> receiving strategic research publications and insights from our Innovation Lab upon request.",
    "privacy.s3_item4": "<strong>Legal obligations:</strong> complying with statutory accounting, tax, and regulatory compliance standards across the UK and Spain.",
    "privacy.s4_title": "4. Strict Confidentiality &amp; Non-Disclosure",
    "privacy.s4_desc": "As an executive management consultancy, SOURX enforces an absolute confidentiality standard. Your corporate and personal data is <strong>never sold, rented, or commercialized</strong> to third parties. It is solely accessible to partners and senior consultants under strict Non-Disclosure Agreements (NDAs) assigned to your engagements.",
    "privacy.s5_title": "5. Technical Security &amp; Data Hosting",
    "privacy.s5_desc": "We enforce enterprise-grade security protocols: end-to-end encryption in transit (TLS 1.3 protocol) and at rest (AES-256), isolated infrastructure environments, and automated daily backups. Our systems are hosted in sovereign data centers across the United Kingdom and the European Union.",
    "privacy.s6_title": "6. Your Rights of Access, Rectification &amp; Erasure",
    "privacy.s6_desc": "In compliance with applicable European and UK data protection frameworks, you hold the following rights regarding your personal data:",
    "privacy.s6_r1": "Right of access to and copy of your personal data records.",
    "privacy.s6_r2": "Right to rectify and update any inaccurate or outdated information.",
    "privacy.s6_r3": "Right to erasure (\"right to be forgotten\") when data is no longer necessary.",
    "privacy.s6_r4": "Right to restrict processing and right to object on legitimate grounds.",
    "privacy.s6_r5": "Right to data portability for information provided to our firm.",
    "privacy.s6_contact": "To exercise any of these rights, contact us at <a href=\"mailto:info@sourx.com\" style=\"color: #012e5c; font-weight: 600;\">info@sourx.com</a> or write to our London office: <em>SOURX EMEA, 71-75 Shelton Street, Covent Garden, London WC2H 9JQ</em>. A formal response will be issued within 30 business days.",
    "privacy.back_btn": "← Return to Home",

    # Terms & Legal Notice full sections
    "terms.s1_title": "1. Platform Publisher",
    "terms.s1_name_lbl": "Corporate Name:",
    "terms.s1_name_val": "SOURX EMEA Ltd",
    "terms.s1_hq_lbl": "UK Registered Headquarters:",
    "terms.s1_hq_val": "71-75 Shelton Street, Covent Garden, London WC2H 9JQ, United Kingdom",
    "terms.s1_spain_lbl": "Spain Operational Hub:",
    "terms.s1_spain_val": "Castellón de la Plana, 12005 Spain",
    "terms.s1_phone_lbl": "Telephone Number:",
    "terms.s1_email_lbl": "Official Contact Email:",
    "terms.s1_pub_lbl": "Publishing Director:",
    "terms.s1_pub_val": "SOURX EMEA Executive Board",
    "terms.s2_title": "2. Hosting &amp; Technical Infrastructure",
    "terms.s2_desc": "The SOURX platform is deployed on resilient, high-availability cloud infrastructure monitored 24/7/365, located in data centers certified ISO 27001, SOC 2 Type II, and GDPR compliant, ensuring business continuity and data integrity.",
    "terms.s3_title": "3. Intellectual Property &amp; Reserved Rights",
    "terms.s3_p1": "All assets comprising this website (including but not limited to: SOURX brand identity, logos, marks, editorial texts, case studies, graphics, video content, proprietary scoring algorithms, source code, and software architecture) are the exclusive property of SOURX EMEA or licensed under authorized commercial agreements.",
    "terms.s3_p2": "Any reproduction, representation, modification, publication, or adaptation of all or part of these assets, by any process whatsoever, is strictly prohibited without prior written consent from SOURX EMEA executive management.",
    "terms.s4_title": "4. Nature of Information &amp; Limitation of Liability",
    "terms.s4_p1": "Information and strategic analyses published on this site are presented solely for general guidance. They do not constitute a formal contractual commitment or definitive legal, tax, or financial advisory advice.",
    "terms.s4_p2": "All advisory, audit, or technological transformation missions are governed by a specific Master Services Agreement (MSA) or Statement of Work, setting forth objectives, milestones, and mutual legal liabilities.",
    "terms.s5_title": "5. Applicable Law &amp; Competent Jurisdiction",
    "terms.s5_desc": "These terms of use are governed by English law and applicable regulations of the European Union. Any dispute concerning their interpretation, execution, or validity shall be subject to the exclusive jurisdiction of the Courts of London, United Kingdom.",
    "terms.s6_title": "6. Contact &amp; Legal Inquiries",
    "terms.s6_desc": "For any inquiries regarding this legal notice or compliance matters, please reach our legal desk at: <a href=\"mailto:info@sourx.com\" style=\"color: #012e5c; font-weight: 600;\">info@sourx.com</a>.",
    "terms.back_btn": "← Return to Home"
}

privacy_terms_es = {
    # Privacy policy full sections
    "privacy.s1_title": "1. Responsable del Tratamiento y Presencia Internacional",
    "privacy.s1_desc": "El responsable del tratamiento de los datos personales es SOURX EMEA, firma multidisciplinar de consultoría que opera bajo las jurisdicciones británica y española:",
    "privacy.s1_hq_lbl": "Sede Reino Unido:",
    "privacy.s1_hq_val": "71-75 Shelton Street, Covent Garden, London WC2H 9JQ, United Kingdom",
    "privacy.s1_spain_lbl": "Centro España (EMEA):",
    "privacy.s1_spain_val": "Castellón de la Plana, 12005 España",
    "privacy.s1_phone_lbl": "Teléfono directo:",
    "privacy.s1_email_lbl": "Correo oficial:",
    "privacy.s2_title": "2. Datos Personales Recopilados",
    "privacy.s2_desc": "En el marco de nuestras actividades de asesoramiento de dirección, únicamente recopilamos los datos estrictamente necesarios para los fines previstos:",
    "privacy.s2_item1": "<strong>Datos de identificación:</strong> nombre completo, cargo/título profesional, empresa u organización representada.",
    "privacy.s2_item2": "<strong>Datos de contacto profesional:</strong> correo electrónico corporativo, número de teléfono, dirección de la sede social.",
    "privacy.s2_item3": "<strong>Información sobre proyectos:</strong> descripción de retos estratégicos, objetivos de transformación digital, plazos transmitidos voluntariamente a través de nuestros formularios.",
    "privacy.s2_item4": "<strong>Datos técnicos de navegación:</strong> dirección IP anonimizada, métricas de rendimiento del sitio, preferencias de idioma (FR, EN, ES).",
    "privacy.s3_title": "3. Fines y Bases Legales del Tratamiento",
    "privacy.s3_desc": "Cada tratamiento de datos se fundamenta en una base jurídica legítima de conformidad con el RGPD (Reglamento UE 2016/679) y la Data Protection Act 2018 (UK):",
    "privacy.s3_item1": "<strong>Ejecución de medidas precontractuales o contractuales:</strong> tramitación de solicitudes de consulta, formalización de mandatos, despliegue de auditorías y arquitecturas de software.",
    "privacy.s3_item2": "<strong>Interés legítimo:</strong> gestión de la relación cliente B2B, seguridad de la plataforma técnica, prevención del fraude.",
    "privacy.s3_item3": "<strong>Consentimiento explícito:</strong> recogida de datos para el envío de análisis estratégicos e informes de nuestro Innovation Lab.",
    "privacy.s3_item4": "<strong>Obligaciones legales:</strong> cumplimiento de requisitos contables, fiscales y regulatorios (Reino Unido y España).",
    "privacy.s4_title": "4. Confidencialidad Estricta y No Divulgación",
    "privacy.s4_desc": "Como firma de consultoría de alta dirección, SOURX aplica una política de confidencialidad absoluta. Sus datos <strong>nunca son vendidos, alquilados ni comercializados</strong> a terceros. Solo acceden a ellos socios y consultores sénior vinculados por acuerdos de confidencialidad (NDA) asignados a sus proyectos.",
    "privacy.s5_title": "5. Seguridad Técnica y Alojamiento",
    "privacy.s5_desc": "Aplicamos estándares de seguridad de nivel empresarial: cifrado de datos en tránsito (protocolo TLS 1.3) y en reposo (AES-256), segmentación de entornos de infraestructura y copias de seguridad periódicas. Nuestras infraestructuras se ubican en centros de datos soberanos en el Reino Unido y la Unión Europea.",
    "privacy.s6_title": "6. Sus Derechos de Acceso, Rectificación y Supresión",
    "privacy.s6_desc": "De conformidad con la normativa europea y británica, dispone de los siguientes derechos en relación con sus datos personales:",
    "privacy.s6_r1": "Derecho de acceso y comunicación de sus datos personales.",
    "privacy.s6_r2": "Derecho de rectificación y actualización de datos inexactos.",
    "privacy.s6_r3": "Derecho de supresión («derecho al olvido») cuando los datos ya no sean necesarios.",
    "privacy.s6_r4": "Derecho a la limitación del tratamiento y derecho de oposición por motivos legítimos.",
    "privacy.s6_r5": "Derecho a la portabilidad de los datos facilitados.",
    "privacy.s6_contact": "Para ejercer estos derechos, envíe su solicitud por correo electrónico a <a href=\"mailto:info@sourx.com\" style=\"color: #012e5c; font-weight: 600;\">info@sourx.com</a> o por correo postal a nuestra sede de Londres: <em>SOURX EMEA, 71-75 Shelton Street, Covent Garden, London WC2H 9JQ</em>. Recibirá respuesta en un plazo de 30 días hábiles.",
    "privacy.back_btn": "← Volver al Inicio",

    # Terms & Legal Notice full sections
    "terms.s1_title": "1. Editor de la Plataforma",
    "terms.s1_name_lbl": "Razón social:",
    "terms.s1_name_val": "SOURX EMEA Ltd",
    "terms.s1_hq_lbl": "Sede social Reino Unido:",
    "terms.s1_hq_val": "71-75 Shelton Street, Covent Garden, London WC2H 9JQ, United Kingdom",
    "terms.s1_spain_lbl": "Centro operativo España:",
    "terms.s1_spain_val": "Castellón de la Plana, 12005 España",
    "terms.s1_phone_lbl": "Número de teléfono:",
    "terms.s1_email_lbl": "Correo oficial de contacto:",
    "terms.s1_pub_lbl": "Director de la publicación:",
    "terms.s1_pub_val": "Dirección General SOURX EMEA",
    "terms.s2_title": "2. Alojamiento e Infraestructura Técnica",
    "terms.s2_desc": "La plataforma SOURX está alojada en infraestructuras cloud de alta seguridad y resiliencia supervisadas 24/7, ubicadas en centros de datos certificados ISO 27001, SOC 2 Tipo II y conformes al RGPD, garantizando alta disponibilidad e integridad.",
    "terms.s3_title": "3. Propiedad Intelectual y Derechos Reservados",
    "terms.s3_p1": "Todos los elementos que integran este sitio web (en particular, la identidad visual de SOURX, logotipos, marcas, textos, casos de estudio, gráficos, vídeos, algoritmos de scoring, código fuente y arquitectura) son propiedad exclusiva de SOURX EMEA o cuentan con licencia de uso.",
    "terms.s3_p2": "Cualquier reproducción, representación, modificación, publicación o adaptación total o parcial de estos contenidos, por cualquier medio o procedimiento, está estrictamente prohibida sin autorización previa por escrito de SOURX EMEA.",
    "terms.s4_title": "4. Naturaleza de la Información y Límite de Responsabilidad",
    "terms.s4_p1": "La información y análisis difundidos en este sitio se presentan a título informativo. No constituyen en ningún caso un compromiso contractual ni asesoramiento jurídico, fiscal o financiero formal.",
    "terms.s4_p2": "Toda misión de consultoría, auditoría o transformación tecnológica se formaliza mediante una propuesta de servicios o contrato específico (Master Services Agreement), donde se detallan objetivos y responsabilidades.",
    "terms.s5_title": "5. Legislación Aplicable y Jurisdicción Competente",
    "terms.s5_desc": "El presente aviso legal se rige por la legislación inglesa y las normativas aplicables de la Unión Europea. Cualquier discrepancia relativa a su interpretación, ejecución o validez se someterá a la jurisdicción exclusiva de los tribunales de Londres, Reino Unido.",
    "terms.s6_title": "6. Contacto y Consultas Jurídicas",
    "terms.s6_desc": "Para cualquier consulta sobre este aviso legal o la conformidad de nuestras operaciones, comuníquese con nuestra asesoría jurídica en: <a href=\"mailto:info@sourx.com\" style=\"color: #012e5c; font-weight: 600;\">info@sourx.com</a>.",
    "terms.back_btn": "← Volver al Inicio"
}

# 1. Update src/js/i18n.js
with open("src/js/i18n.js", "r", encoding="utf-8") as f:
    js_content = f.read()

# Helper to format dictionary additions
def format_dict_entries(entries):
    lines = []
    for k, v in entries.items():
        # Escape quotes in v if necessary
        v_escaped = v.replace('\\"', '"').replace('"', '\\"')
        lines.append(f'    "{k}": "{v_escaped}",\n')
    return "".join(lines)

# Inject FR entries
fr_match = re.search(r'  fr: \{(.*?)\n  \},', js_content, re.DOTALL)
if not fr_match:
    raise ValueError("Could not find fr dictionary")
fr_body = fr_match.group(1)
new_fr_body = fr_body + "\n\n    // Privacy & Terms Full Text\n" + format_dict_entries(privacy_terms_fr)
js_content = js_content[:fr_match.start(1)] + new_fr_body + js_content[fr_match.end(1):]

# Inject EN entries
en_match = re.search(r'  en: \{(.*?)\n  \},', js_content, re.DOTALL)
if not en_match:
    raise ValueError("Could not find en dictionary")
en_body = en_match.group(1)
new_en_body = en_body + "\n\n    // Privacy & Terms Full Text\n" + format_dict_entries(privacy_terms_en)
js_content = js_content[:en_match.start(1)] + new_en_body + js_content[en_match.end(1):]

# Inject ES entries
es_match = re.search(r'  es: \{(.*?)\n  \}\n\};', js_content, re.DOTALL)
if not es_match:
    raise ValueError("Could not find es dictionary")
es_body = es_match.group(1)
new_es_body = es_body + "\n\n    // Privacy & Terms Full Text\n" + format_dict_entries(privacy_terms_es)
js_content = js_content[:es_match.start(1)] + new_es_body + js_content[es_match.end(1):]

with open("src/js/i18n.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Added {len(privacy_terms_fr)} keys to FR, EN, and ES in src/js/i18n.js")
