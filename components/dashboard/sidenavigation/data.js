import HomeIcon from './icons/home';
import BillsIcon from './icons/bills';
import AnalyticsIcon from './icons/analytics';
import MonitoringIcon from './icons/monitoring';
import DemographicsIcon from './icons/demographics';
import ApplicationsIcon from './icons/applications';
import DocumentationIcon from './icons/documentation';

const data = [
  {
    title: 'Home',
    icon: <HomeIcon />,
    link: '/',
  },
  {
    title: 'College Data',
    icon: <BillsIcon />,
    link: '/admin/collegedata',
  },
  {
    title: 'Exam Data',
    icon: <ApplicationsIcon />,
    link: '/admin/examdata',
  },
  {
    title: 'Courses Data',
    icon: <MonitoringIcon />,
    link: '/admin/coursesdata',
  },
  {
    title: 'Documentation',
    icon: <DocumentationIcon />,
    link: '/admin/documentation',
  },
];

export default data;
