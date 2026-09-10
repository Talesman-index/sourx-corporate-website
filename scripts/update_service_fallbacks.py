# -*- coding: utf-8 -*-
import re

# Dictionary of authentic French content for the 4 service subpages
service_updates = {
    "services/strategy/index.html": {
        "title": "Conseil en Stratégie &amp; Management.",
        "lead": "Naviguer les mutations de marché avec une clarté analytique sans compromis, des plans de transformation structurés et une allocation rigoureuse du capital.",
        "badge": "PÔLE D'EXPERTISE 01",
        "meth_badge": "NOTRE MÉTHODOLOGIE",
        "meth_title": "La rigueur analytique au service de l'exécution terrain.",
        "meth_desc": "Nous intervenons auprès des conseils d'administration, directoires et fonds d'investissement pour résoudre des problématiques complexes où l'inertie opérationnelle menace la performance.",
        "stat_val": "10+",
        "stat_lbl": "Marchés Internationaux Couverts",
        "stat_desc": "Accompagnement continu d'entreprises européennes et britanniques dans leur déploiement.",
        "cta_title": "Prêt à structurer votre feuille de route stratégique ?",
        "cta_desc": "Échangez directement avec un associé SOURX pour évaluer vos leviers de performance.",
        "cta_btn": "Démarrer un Échange Stratégique →"
    },
    "services/finance/index.html": {
        "title": "Finance, Audit &amp; Advisory.",
        "lead": "Sécuriser la valorisation, fiabiliser les états financiers et orchestrer des transactions de capital avec une précision mathématique.",
        "badge": "PÔLE D'EXPERTISE 02",
        "meth_badge": "SÉCURITÉ &amp; PERFORMANCE",
        "meth_title": "La rigueur du chiffre au service de la décision stratégique.",
        "meth_desc": "Nos experts en ingénierie financière accompagnent les directions générales et financières dans la structuration de leur bilan, l'anticipation des risques prudentiels et l'évaluation fine de leurs actifs.",
        "stat_val": "100%",
        "stat_lbl": "Conformité &amp; Indépendance",
        "stat_desc": "Rapports d'assurance et audits conformes aux normes internationales les plus exigeantes.",
        "cta_title": "Sécurisez vos états financiers et vos opérations de capital",
        "cta_desc": "Consultez nos associés auditeurs pour une évaluation indépendante de votre situation financière.",
        "cta_btn": "Prendre Contact avec nos Experts Finance →"
    },
    "services/innovation/index.html": {
        "title": "Innovation &amp; Automatisation Opérationnelle.",
        "lead": "De l'ingénierie appliquée aux pipelines d'agents autonomes en production : nous concevons des solutions d'automatisation intelligente qui éliminent les frictions et génèrent un ROI tangible dès le premier trimestre.",
        "badge": "PÔLE D'EXPERTISE 04 • EN VEDETTE",
        "meth_badge": "APPLICATIONS OPÉRATIONNELLES",
        "meth_title": "Dépasser le battage médiatique pour automatiser la vraie valeur métier.",
        "meth_desc": "Notre approche de l'automatisation opérationnelle repose sur l'ancrage dans vos processus d'entreprise existants. Nous n'empilons pas des couches de gadgets : nous automatisons ce qui coûte du temps et des capitaux.",
        "stat_val": "3x",
        "stat_lbl": "Vitesse d'Itération &amp; Déploiement",
        "stat_desc": "Passage de l'analyse des processus au flux automatisé validé en conditions réelles en moins de 4 semaines.",
        "cta_title": "Passez à l'automatisation opérationnelle à grande échelle",
        "cta_desc": "Activez nos ingénieurs en innovation et automatisation pour prototyper vos premiers flux en 30 jours.",
        "cta_btn": "Lancer un Sprint d'Automatisation →"
    },
    "services/growth/index.html": {
        "title": "Croissance &amp; Performance Commerciale.",
        "lead": "Accélérer la conquête de parts de marché, structurer l'expansion internationale et optimiser les moteurs de revenus récurrents.",
        "badge": "PÔLE D'EXPERTISE 05",
        "meth_badge": "EXPANSION &amp; IMPACT",
        "meth_title": "Des moteurs d'acquisition prévisibles et scalables.",
        "meth_desc": "La croissance durable ne découle pas du hasard : elle repose sur l'alignement strict entre la proposition de valeur, l'expérience client et l'efficacité des équipes de vente.",
        "stat_val": "+40%",
        "stat_lbl": "Efficacité Commerciale",
        "stat_desc": "Gains moyens mesurés sur les cycles de conversion après refonte des processus RevOps.",
        "cta_title": "Multipliez vos opportunités d'affaires à l'international",
        "cta_desc": "Bénéficiez de notre système de scoring prédictif et de notre réseau pour accélérer vos revenus.",
        "cta_btn": "Échanger avec notre Équipe Croissance →"
    }
}

for file_path, updates in service_updates.items():
    with open(file_path, "r", encoding="utf-8") as f:
        html = f.read()

    prefix = "serv_strat" if "strategy" in file_path else ("serv_fin" if "finance" in file_path else ("serv_ia" if "innovation" in file_path else "serv_growth"))

    # Replace badge
    html = re.sub(
        r'(data-i18n="' + prefix + r'\.badge"[^>]*>)(.*?)(</span>)',
        r'\g<1>' + updates["badge"] + r'\g<3>',
        html
    )
    # Replace title
    html = re.sub(
        r'(data-i18n="' + prefix + r'\.title"[^>]*>)(.*?)(</h1>)',
        r'\g<1>' + updates["title"] + r'\g<3>',
        html
    )
    # Replace lead
    html = re.sub(
        r'(data-i18n="' + prefix + r'\.lead"[^>]*>)(.*?)(</p>)',
        r'\g<1>' + updates["lead"] + r'\g<3>',
        html
    )
    # Replace meth_badge
    html = re.sub(
        r'(data-i18n="' + prefix + r'\.meth_badge"[^>]*>)(.*?)(</span>)',
        r'\g<1>' + updates["meth_badge"] + r'\g<3>',
        html
    )
    # Replace meth_title
    html = re.sub(
        r'(data-i18n="' + prefix + r'\.meth_title"[^>]*>)(.*?)(</h2>)',
        r'\g<1>' + updates["meth_title"] + r'\g<3>',
        html
    )
    # Replace meth_desc
    html = re.sub(
        r'(data-i18n="' + prefix + r'\.meth_desc"[^>]*>)(.*?)(</p>)',
        r'\g<1>' + updates["meth_desc"] + r'\g<3>',
        html
    )
    # Replace stat_val
    html = re.sub(
        r'(data-i18n="' + prefix + r'\.stat_val"[^>]*>)(.*?)(</div>)',
        r'\g<1>' + updates["stat_val"] + r'\g<3>',
        html
    )
    # Replace stat_lbl
    html = re.sub(
        r'(data-i18n="' + prefix + r'\.stat_lbl"[^>]*>)(.*?)(</div>)',
        r'\g<1>' + updates["stat_lbl"] + r'\g<3>',
        html
    )
    # Replace stat_desc
    html = re.sub(
        r'(data-i18n="' + prefix + r'\.stat_desc"[^>]*>)(.*?)(</p>)',
        r'\g<1>' + updates["stat_desc"] + r'\g<3>',
        html
    )
    # Replace cta_title
    html = re.sub(
        r'(data-i18n="' + prefix + r'\.cta_title"[^>]*>)(.*?)(</h2>)',
        r'\g<1>' + updates["cta_title"] + r'\g<3>',
        html
    )
    # Replace cta_desc
    html = re.sub(
        r'(data-i18n="' + prefix + r'\.cta_desc"[^>]*>)(.*?)(</p>)',
        r'\g<1>' + updates["cta_desc"] + r'\g<3>',
        html
    )
    # Replace cta_btn
    html = re.sub(
        r'(data-i18n="' + prefix + r'\.cta_btn"[^>]*>)(.*?)(</a>)',
        r'\g<1><span>' + updates["cta_btn"] + r'</span>\g<3>',
        html
    )

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(html)

print("Updated 4 service fallback HTML files.")
