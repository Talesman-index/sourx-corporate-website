#!/usr/bin/env python3
"""
Safely updates src/js/i18n.js to highlight Chartered Accountancy & Statutory Audit
as the core practice across FR, EN, and ES dictionaries.
"""
import re

I18N_PATH = "src/js/i18n.js"

with open(I18N_PATH, "r", encoding="utf-8") as f:
    content = f.read()

# Split into language blocks: fr: { ... }, en: { ... }, es: { ... }
# We can do exact string replacements section by section or key by key within the blocks.

fr_updates = {
    '"nav.s_finance"': '"Expertise Comptable, Audit &amp; Finance"',
    '"hero.ticker"': '"Cabinet d\'expertise comptable, d\'audit &amp; de conseil multidisciplinaire ✱ Londres &amp; Castellón ✱ Plus de 80 % de taux de croissance d\'acquisition ✱ 150+ missions réussies"',
    '"hero.desc"': '"Nous aidons les organisations à auditer, transformer et diriger. De l\'expertise comptable rigoureuse et du commissariat aux comptes jusqu\'aux architectures logicielles et IA, nous bâtissons un avantage concurrentiel durable."',
    '"about.statement"': '"SOURX EMEA est un cabinet d\'expertise comptable, d\'audit légal et de conseil multidisciplinaire basé à Londres et en Espagne. Notre vocation : <strong>sécuriser vos opérations financières, transformer et faire grandir votre entreprise</strong>. En bousculant les méthodes établies, nous développons un avantage concurrentiel durable. Au-delà des théories abstraites, nos équipes combinent la rigueur certifiée du chiffre et du contrôle de gestion avec l\'ingénierie logicielle, la stratégie de direction et l\'automatisation IA."',
    '"about.stat3_desc"': '"Expertise Comptable &amp; Audit (Cœur de métier), Stratégie, Tech, IA &amp; Croissance."',
    '"services.s1_title"': '"01. Expertise Comptable, Audit Légal &amp; Finance"',
    '"services.s1_desc"': '"Cabinet d\'expertise comptable agréé : tenue des comptes, bilans annuels, déclarations fiscales et sociales, audit légal &amp; certification des comptes, restructuration financière et conseil de direction."',
    '"contact.opt_finance"': '"01. Expertise Comptable, Audit Légal &amp; Finance (Cœur de métier)"',
    '"contact.opt_strategy"': '"02. Conseil Stratégique &amp; Direction"',
    '"serv.s1_badge"': '"PÔLE 01 • EN VEDETTE • CŒUR DE MÉTIER • EXPERTISE COMPTABLE &amp; AUDIT"',
    '"serv.s1_title"': '"Expertise Comptable, Commissariat aux Comptes &amp; Finance d\'Entreprise"',
    '"serv.s1_lead"': '"Cabinet d\'expertise comptable agréé : tenue des comptes, bilans annuels et situations intermédiaires, déclarations fiscales et sociales, certification légale des comptes, modélisation de valorisation et restructuration financière."',
    '"serv.s1_c1"': '"Expertise Comptable Agréée"',
    '"serv.s1_c2"': '"Commissariat aux Comptes &amp; Audit"',
    '"serv.s1_c3"': '"Fiscalité &amp; Bilans Annuels"',
    '"serv.s1_c4"': '"Restructuration &amp; M&amp;A"',
    '"serv.s1_btn"': '"Découvrir le Pôle Expertise Comptable &amp; Audit →"',
    '"serv.s2_badge"': '"PÔLE 02 • STRATÉGIE &amp; GOUVERNANCE"',
    '"serv.s2_title"': '"Conseil en Stratégie &amp; Management d\'Entreprise"',
    '"serv.s2_lead"': '"Feuilles de route d\'entreprise, plans d\'affaires directeurs, structuration organisationnelle et optimisation des processus opérationnels pour bâtir un avantage concurrentiel durable."',
    '"serv.s2_c1"': '"Plans d\'Affaires Directeurs"',
    '"serv.s2_c2"': '"Transformation M&amp;A"',
    '"serv.s2_c3"': '"Études Prédictives"',
    '"serv.s2_c4"': '"Alignement C-Suite"',
    '"serv.s2_btn"': '"Découvrir le Pôle Stratégie →"',
    '"serv.s4_badge"': '"PÔLE 04 • LAB INNOVATION &amp; AUTOMATISATION"',
    '"serv_fin.badge"': '"CŒUR DE MÉTIER DU CABINET • PÔLE 01"',
    '"serv_fin.title"': '"Expertise Comptable, Audit Légal &amp; Advisory Financier."',
    '"serv_fin.lead"': '"Cabinet d\'expertise comptable et de commissariat aux comptes : sécuriser la conformité réglementaire, certifier vos bilans et piloter la performance de votre capital."',
    '"serv_fin.meth_badge"': '"RIGUEUR COMPTABLE &amp; LÉGALE"',
    '"serv_fin.meth_title"': '"L\'exigence du chiffre certifié au service de la direction générale."',
    '"serv_fin.meth_desc"': '"Nos experts-comptables et commissaires aux comptes accompagnent les dirigeants et directions financières dans la tenue et surveillance comptable, l\'arrêté des comptes, l\'audit légal et la structuration financière à haute valeur ajoutée."',
    '"serv_fin.stat_lbl"': '"Conformité &amp; Indépendance Légale"',
    '"serv_fin.stat_desc"': '"Comptes certifiés et missions d\'audit conformes aux normes professionnelles les plus exigeantes (Ordre des Experts-Comptables, ICAEW, normes IFRS/UK GAAP)."',
    '"serv_fin.ax1_t"': '"Expertise Comptable, Bilans &amp; Fiscalité"',
    '"serv_fin.ax1_d"': '"Tenue, révision et arrêté des comptes, établissement des bilans et liasses fiscales, reporting de gestion et sécurisation fiscale des entreprises."',
    '"serv_fin.ax2_t"': '"Commissariat aux Comptes &amp; Audit Légal"',
    '"serv_fin.ax2_d"': '"Certification de la régularité et sincérité des comptes, examen critique du contrôle interne et missions d\'assurance indépendante."',
    '"serv_fin.ax3_t"': '"Modélisation Financière, Valorisation &amp; Trésorerie"',
    '"serv_fin.ax3_d"': '"Construction de modèles de prévision de trésorerie dynamiques, valorisation d\'actifs incorporels et optimisation de la structure financière."',
    '"serv_fin.ax4_t"': '"Transaction Services, Restructuration &amp; M&amp;A"',
    '"serv_fin.ax4_d"': '"Due diligence financière d\'acquisition et de cession, restructuration d\'entreprises sous tension (turnaround) et intégration post-fusion."',
    '"serv_fin.cta_title"': '"Confiez vos bilans et vos audits à nos experts-comptables agréés"',
    '"serv_fin.cta_desc"': '"Prenez rendez-vous avec nos experts-comptables et associés auditeurs pour un diagnostic financier complet."',
    '"serv_fin.cta_btn"': '"Consulter le Cabinet d\'Expertise Comptable →"'
}

en_updates = {
    '"nav.s_finance"': '"Chartered Accountancy, Audit &amp; Finance"',
    '"hero.ticker"': '"Chartered accountancy, statutory audit &amp; multidisciplinary advisory firm ✱ London &amp; Castellón Hubs ✱ Over 80% client acquisition growth ✱ 150+ successful missions"',
    '"hero.desc"': '"Helping organizations audit, transform, and lead. From rigorous chartered accountancy and statutory audit to scalable software engineering and AI automation, we engineer lasting competitive advantage."',
    '"about.statement"': '"SOURX EMEA is a chartered accountancy, statutory audit and multidisciplinary advisory firm based in London and Spain. Our mission: <strong>securing your financial integrity, transforming operations, and driving sustainable growth</strong>. Beyond abstract theories, our teams combine certified numerical rigor and statutory compliance with bespoke software engineering, executive strategy, and applied AI automation."',
    '"about.stat3_desc"': '"Chartered Accountancy &amp; Audit (Core Practice), Strategy, Tech, AI &amp; Growth."',
    '"services.s1_title"': '"01. Chartered Accountancy, Audit &amp; Finance"',
    '"services.s1_desc"': '"Certified chartered accounting practice: statutory audit, annual accounts, corporate tax compliance, financial restructuring, and executive advisory."',
    '"contact.opt_finance"': '"01. Chartered Accountancy, Audit &amp; Finance (Core Practice)"',
    '"contact.opt_strategy"': '"02. Corporate Strategy &amp; Governance"',
    '"serv.s1_badge"': '"PRACTICE 01 • FEATURED • CORE PRACTICE • CHARTERED ACCOUNTANCY &amp; AUDIT"',
    '"serv.s1_title"': '"Chartered Accountancy, Statutory Audit &amp; Corporate Finance"',
    '"serv.s1_lead"': '"Certified chartered accounting practice: full accounts management, annual financial statements, corporate tax filings, independent statutory audits, turnaround restructuring, and valuation modeling."',
    '"serv.s1_c1"': '"Chartered Accountancy"',
    '"serv.s1_c2"': '"Statutory Audit &amp; Assurance"',
    '"serv.s1_c3"': '"Corporate Tax &amp; Accounts"',
    '"serv.s1_c4"': '"Restructuring &amp; M&amp;A"',
    '"serv.s1_btn"': '"Explore Accounting &amp; Audit Practice →"',
    '"serv.s2_badge"': '"PRACTICE 02 • STRATEGY &amp; GOVERNANCE"',
    '"serv.s2_title"': '"Corporate Strategy &amp; Executive Management"',
    '"serv.s2_lead"': '"Corporate transformation roadmaps, business planning, operating model design, and process optimization built to create lasting market advantage."',
    '"serv.s2_c1"': '"Master Business Plans"',
    '"serv.s2_c2"': '"M&amp;A Restructuring"',
    '"serv.s2_c3"': '"Predictive Modeling"',
    '"serv.s2_c4"': '"C-Suite Alignment"',
    '"serv.s2_btn"': '"Explore Strategy Practice →"',
    '"serv.s4_badge"': '"PRACTICE 04 • INNOVATION &amp; AUTOMATION LAB"',
    '"serv_fin.badge"': '"CORE PRACTICE • PRACTICE AREA 01"',
    '"serv_fin.title"': '"Chartered Accountancy, Statutory Audit &amp; Financial Advisory."',
    '"serv_fin.lead"': '"Certified chartered accounting and statutory audit practice: safeguarding regulatory compliance, certifying annual accounts, and driving capital performance."',
    '"serv_fin.meth_badge"': '"ACCOUNTING RIGOR &amp; STATUTORY ASSURANCE"',
    '"serv_fin.meth_title"': '"Certified numerical discipline supporting executive governance."',
    '"serv_fin.meth_desc"': '"Our certified chartered accountants and statutory auditors assist business owners and CFOs in ledger management, annual accounts preparation, tax structuring, statutory audits, and high-stakes financial engineering."',
    '"serv_fin.stat_lbl"': '"Certified Compliance &amp; Independence"',
    '"serv_fin.stat_desc"': '"Certified accounts and audit reports meeting the most stringent international standards (ICAEW, FRC, IFRS and UK GAAP)."',
    '"serv_fin.ax1_t"': '"Chartered Accountancy, Year-End &amp; Tax Filings"',
    '"serv_fin.ax1_d"': '"Full accounting management, year-end accounts preparation, corporation tax computations, VAT/PAYE compliance, and management reporting."',
    '"serv_fin.ax2_t"': '"Statutory Audit &amp; Independent Assurance"',
    '"serv_fin.ax2_d"': '"Independent statutory audit certification, rigorous internal control reviews, and due diligence assurance for key stakeholders."',
    '"serv_fin.ax3_t"': '"Financial Modeling, Valuation &amp; Cash Flow"',
    '"serv_fin.ax3_d"': '"Dynamic cash-flow forecasting models, intangible asset valuation, working capital optimization, and financial stress testing."',
    '"serv_fin.ax4_t"': '"Transaction Services, Turnaround &amp; M&amp;A"',
    '"serv_fin.ax4_d"': '"Buy-side and sell-side financial due diligence, distressed business turnaround engineering, and post-merger accounting integration."',
    '"serv_fin.cta_title"': '"Entrust your accounts and audits to certified chartered accountants"',
    '"serv_fin.cta_desc"': '"Book a strategic consultation with our chartered accounting partners and senior auditors for a comprehensive financial review."',
    '"serv_fin.cta_btn"': '"Consult our Chartered Accounting Practice →"'
}

es_updates = {
    '"nav.s_finance"': '"Contabilidad, Auditoría y Finanzas"',
    '"hero.ticker"': '"Firma de contabilidad, auditoría legal &amp; consultoría multidisciplinar ✱ Sedes en Londres y Castellón ✱ Más del 80 % de crecimiento en captación ✱ 150+ misiones"',
    '"hero.desc"': '"Ayudamos a las organizaciones a auditar, transformar y liderar. Desde el rigor contable y la auditoría legal certificada hasta la ingeniería de software y la IA, forjamos una ventaja competitiva sostenible."',
    '"about.statement"': '"SOURX EMEA es una firma de contabilidad y auditoría legal, y de consultoría multidisciplinar con sedes en Londres y España. Nuestra misión: <strong>asegurar el rigor financiero de su negocio, transformar y acelerar el crecimiento</strong>. Combinamos la disciplina y seguridad jurídica de la contabilidad y auditoría certificadas con el desarrollo de software a medida, la estrategia de dirección y la inteligencia artificial aplicada."',
    '"about.stat3_desc"': '"Contabilidad y Auditoría (Actividad Principal), Estrategia, Tecnología, IA y Crecimiento."',
    '"services.s1_title"': '"01. Contabilidad, Auditoría Legal y Finanzas"',
    '"services.s1_desc"': '"Firma contable y auditora certificada: elaboración de balances, auditoría legal y certificación de cuentas, cumplimiento fiscal y tributario, y reestructuración financiera."',
    '"contact.opt_finance"': '"01. Contabilidad, Auditoría Legal y Finanzas (Actividad Principal)"',
    '"contact.opt_strategy"': '"02. Consultoría Estratégica y Dirección"',
    '"serv.s1_badge"': '"DIVISIÓN 01 • DESTACADO • ACTIVIDAD PRINCIPAL • CONTABILIDAD Y AUDITORÍA"',
    '"serv.s1_title"': '"Contabilidad de Empresas, Auditoría Legal y Finanzas"',
    '"serv.s1_lead"': '"Firma contable y auditora certificada: gestión contable integral, elaboración y depósito de balances, declaraciones fiscales y laborales, auditoría de cuentas legal, modelización de valoración y reestructuración financiera."',
    '"serv.s1_c1"': '"Contabilidad y Cuentas Anuales"',
    '"serv.s1_c2"': '"Auditoría Legal Certificada"',
    '"serv.s1_c3"': '"Gestión Fiscal y Tributaria"',
    '"serv.s1_c4"': '"Reestructuración y M&amp;A"',
    '"serv.s1_btn"': '"Descubrir Contabilidad y Auditoría →"',
    '"serv.s2_badge"': '"DIVISIÓN 02 • ESTRATEGIA Y GOBERNANZA"',
    '"serv.s2_title"': '"Consultoría Estratégica y Dirección Corporativa"',
    '"serv.s2_lead"': '"Hojas de ruta empresariales, planes de negocio directivos, reestructuración organizativa y optimización de procesos para ganar ventaja competitiva."',
    '"serv.s2_c1"': '"Planes de Negocio"',
    '"serv.s2_c2"': '"Procesos M&amp;A"',
    '"serv.s2_c3"': '"Modelización Predictiva"',
    '"serv.s2_c4"': '"Alineación Directiva"',
    '"serv.s2_btn"': '"Ver División de Estrategia →"',
    '"serv.s4_badge"': '"DIVISIÓN 04 • LAB INNOVACIÓN Y AUTOMATIZACIÓN"',
    '"serv_fin.badge"': '"ACTIVIDAD PRINCIPAL • DIVISIÓN 01"',
    '"serv_fin.title"': '"Contabilidad de Empresas, Auditoría Legal y Finanzas."',
    '"serv_fin.lead"': '"Firma de contabilidad y auditoría de cuentas legal: aseguramiento de cumplimiento normativo, certificación de balances y gestión óptima de su capital."',
    '"serv_fin.meth_badge"': '"RIGOR CONTABLE Y SEGURIDAD LEGAL"',
    '"serv_fin.meth_title"': '"El rigor cuantitativo certificado al servicio de la dirección general."',
    '"serv_fin.meth_desc"': '"Nuestros expertos contables y auditores colegiados asesoran a direcciones generales y financieras en la gestión contable, elaboración de balances, auditoría legal y estructuración financiera de alto impacto."',
    '"serv_fin.stat_lbl"': '"Cumplimiento e Independencia Legal"',
    '"serv_fin.stat_desc"': '"Cuentas anuales certificadas e informes de auditoría conforme a las normativas profesionales más exigentes (ICAC, IFRS, normativas fiscales y mercantiles)."',
    '"serv_fin.ax1_t"': '"Contabilidad de Empresas, Balances e Impuestos"',
    '"serv_fin.ax1_d"': '"Gestión integral de contabilidad, formulación y depósito de cuentas anuales, liquidación de impuestos y asesoramiento fiscal continuo."',
    '"serv_fin.ax2_t"': '"Auditoría Legal y Aseguramiento Independiente"',
    '"serv_fin.ax2_d"': '"Auditoría obligatoria y voluntaria de cuentas anuales, revisión de control interno y emisión de informes de auditoría legal independientes."',
    '"serv_fin.ax3_t"': '"Modelización Financiera, Valoración y Tesorería"',
    '"serv_fin.ax3_d"': '"Construcción de planes de tesorería predictivos dinámicos, valoración de empresas e intangibles y optimización de capital circulante."',
    '"serv_fin.ax4_t"': '"Reestructuración, Turnaround y M&amp;A"',
    '"serv_fin.ax4_d"': '"Due diligence financiera de compra y venta, reflotamiento de empresas en dificultad (turnaround) y soporte en operaciones corporativas."',
    '"serv_fin.cta_title"': '"Confíe sus balances y auditorías a nuestros expertos colegiados"',
    '"serv_fin.cta_desc"': '"Reserve una consulta estratégica con nuestros auditores y expertos contables para una revisión financiera completa."',
    '"serv_fin.cta_btn"': '"Contactar con el Despacho de Contabilidad →"'
}

# Locate the three sections: fr: { ... }, en: { ... }, es: { ... }
fr_idx = content.find("fr: {")
en_idx = content.find("en: {")
es_idx = content.find("es: {")

if not (fr_idx != -1 and en_idx != -1 and es_idx != -1):
    print("Error: Could not locate language blocks")
    exit(1)

fr_block = content[fr_idx:en_idx]
en_block = content[en_idx:es_idx]
es_block = content[es_idx:]

def apply_block_updates(block, updates):
    for key, new_val in updates.items():
        # Pattern: key + optional spaces + : + optional spaces + "..." or '...'
        # up to the trailing comma or line end
        pattern = re.compile(re.escape(key) + r'\s*:\s*(".*?"|\'.*?\')(?=,|\n)', re.DOTALL)
        if pattern.search(block):
            block = pattern.sub(f'{key}: {new_val}', block, count=1)
        else:
            print(f"Warning: Key {key} not matched in block")
    return block

print("Updating FR block...")
new_fr = apply_block_updates(fr_block, fr_updates)

print("Updating EN block...")
new_en = apply_block_updates(en_block, en_updates)

print("Updating ES block...")
new_es = apply_block_updates(es_block, es_updates)

new_content = content[:fr_idx] + new_fr + new_en + new_es

with open(I18N_PATH, "w", encoding="utf-8") as f:
    f.write(new_content)

print("src/js/i18n.js successfully updated!")
