import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/frontend_assets/assets'
import { useTranslation } from 'react-i18next'

const AppDownload = () => {
  const { t } = useTranslation()

  return (
    <div className='app-download'>
      <p>{t("download_experience")}</p>
      <div className="app-download-platforms">
        <img src={assets.play_store} alt="play_store" />
        <img src={assets.app_store} alt="app_store" />
      </div>
    </div>
  )
}

export default AppDownload
