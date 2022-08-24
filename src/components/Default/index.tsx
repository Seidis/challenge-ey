import styles from './Default.module.scss';

export default function Default() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1>Default</h1>
                </div>
            </div>
        </>
    );
}