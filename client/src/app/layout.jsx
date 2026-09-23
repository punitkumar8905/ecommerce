import './globals.css'
import { ToastContainer} from 'react-toastify';

export const metadata = {
    title: 'ecommerce - E-commerce platform',
    description: 'Modern  e-commerce platform with admin panel',
};


import ReduxProvider from '@/redux/ReduxProvider';

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body>
                <ReduxProvider>
                <ToastContainer/>
                {children}
               </ReduxProvider>
            </body>
        </html>
    );
}