import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Здесь вы можете логгировать ошибку
        console.error('Error in component:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Здесь вы можете отобразить запасной интерфейс при наличии ошибки
            return <div>Something went wrong.</div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
