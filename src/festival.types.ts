export type FestivalFields = {
   envergure_territoriale?: string
   code_insee_commune?: string
   geocodage_xy?: [number, number]
   complement_d_adresse_facultatif?: string
   type_de_voie_rue_avenue_boulevard_etc?: string
   annee_de_creation_du_festival?: string
   periode_principale_de_deroulement_du_festival?: string
   discipline_dominante: string
   nom_du_festival: string
   libelle_epci_collage_en_valeur?: string
   commune_principale_de_deroulement?: string
   region_principale_de_deroulement?: string
   code_insee_epci_collage_en_valeur?: string
   adresse_postale?: string
   departement_principal_de_deroulement: string
   numero_de_voie?: string
   identifiant?: string
   code_postal_de_la_commune_principale_de_deroulement?: string
   site_internet_du_festival: string
   adresse_e_mail?: string
   nom_de_la_voie?: string
   decennie_de_creation_du_festival?: string
   sous_categorie_arts_visuels_et_arts_numeriques?: string
   sous_categorie_livre_et_litterature?: string
   // Add more fields as needed
}
export type Festival = {
   datasetid?: string
   recordid: string
   fields: FestivalFields
   geometry?: {
      type?: string
      coordinates?: [number, number]
   }
   record_timestamp?: string
}

export type CreateFestivalType = Partial<Festival>
