<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240514075206 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE billet (id INT AUTO_INCREMENT NOT NULL, evenement_id_id INT DEFAULT NULL, utilisateur_id_id INT DEFAULT NULL, quantite INT NOT NULL, date_achat DATE NOT NULL, INDEX IDX_1F034AF6ECEE32AF (evenement_id_id), INDEX IDX_1F034AF6B981C689 (utilisateur_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE evenement (id INT AUTO_INCREMENT NOT NULL, titre VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, date DATE NOT NULL, lieu VARCHAR(255) NOT NULL, prix DOUBLE PRECISION NOT NULL, maximum INT NOT NULL, raison VARCHAR(255) DEFAULT NULL, annulation TINYINT(1) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `user` (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE billet ADD CONSTRAINT FK_1F034AF6ECEE32AF FOREIGN KEY (evenement_id_id) REFERENCES evenement (id)');
        $this->addSql('ALTER TABLE billet ADD CONSTRAINT FK_1F034AF6B981C689 FOREIGN KEY (utilisateur_id_id) REFERENCES `user` (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE billet DROP FOREIGN KEY FK_1F034AF6ECEE32AF');
        $this->addSql('ALTER TABLE billet DROP FOREIGN KEY FK_1F034AF6B981C689');
        $this->addSql('DROP TABLE billet');
        $this->addSql('DROP TABLE evenement');
        $this->addSql('DROP TABLE `user`');
    }
}
