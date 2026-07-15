import { createContext, useContext, type ReactNode } from 'react'
import { profileFallback, type Profile } from '@/data/profile'
import { useWordPressProfile } from '@/lib/wordpress/hooks'

interface ProfileContextValue {
  profile: Profile
  loading: boolean
  fromWordPress: boolean
}

const ProfileContext = createContext<ProfileContextValue>({
  profile: profileFallback,
  loading: true,
  fromWordPress: false,
})

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { data, loading } = useWordPressProfile()

  return (
    <ProfileContext.Provider
      value={{
        profile: data ?? profileFallback,
        loading,
        fromWordPress: Boolean(data),
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  return useContext(ProfileContext)
}
