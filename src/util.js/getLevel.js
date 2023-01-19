import A1 from '../components/ProgressAvatar/A1.gif';
import A2 from '../components/ProgressAvatar/A2.gif';
import A3 from '../components/ProgressAvatar/A3.gif';
import B1 from '../components/ProgressAvatar/beginner1.gif';
import B2 from '../components/ProgressAvatar/B2.gif';
import B3 from '../components/ProgressAvatar/B3.gif';
import P1 from '../components/ProgressAvatar/P1.gif';
import P2 from '../components/ProgressAvatar/P2.gif';
import P3 from '../components/ProgressAvatar/P3.gif';
import S1 from '../components/ProgressAvatar/S1.gif';
import S2 from '../components/ProgressAvatar/S2.gif';
import S3 from '../components/ProgressAvatar/S3.gif';
import WC1 from '../components/ProgressAvatar/WC1.gif';

export const getLevel = (score) => {
  switch (true) {
    case score >= 0 && score <= 10:
      return { level: 'Amateure1', min: 0, max: 10, avatar: A1 };
    case score >= 11 && score <= 20:
      return { level: 'Amateure1', min: 11, max: 20, avatar: A2 };
    case score >= 21 && score <= 30:
      return { level: 'Amateure1', min: 21, max: 30, avatar: A3 };
    case score >= 31 && score <= 40:
      return { level: 'Beginer1', min: 31, max: 40, avatar: B1 };
    case score >= 41 && score <= 50:
      return { level: 'Beginer2', min: 41, max: 50, avatar: B2 };
    case score >= 51 && score <= 60:
      return { level: 'Beginer3', min: 51, max: 60, avatar: B3 };
    case score >= 61 && score <= 70:
      return { level: 'Pro1', min: 61, max: 70, avatar: P1 };
    case score >= 81 && score <= 90:
      return { level: 'Pro2', min: 81, max: 90, avatar: P2 };
    case score >= 91 && score <= 100:
      return { level: 'Pro3', min: 91, max: 100, avatar: P3 };
    case score >= 101 && score <= 110:
      return { level: 'Super1', min: 101, max: 110, avatar: S1 };
    case score >= 111 && score <= 120:
      return { level: 'Super2', min: 111, max: 120, avatar: S2 };
    case score >= 121 && score <= 130:
      return { level: 'Super3', min: 121, max: 130, avatar: S3 };
    case score >= 131 && score <= 140:
      return { level: 'World Class', min: 131, max: 140, avatar: WC1 };
    default:
      return { level: 'Beginner', min: 0, max: 10, avatar: B1 };
  }
};
